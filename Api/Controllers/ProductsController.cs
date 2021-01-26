using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.DTOS.ForCreations;
using Api.Data.DTOS.ForReturn;
using Api.Data.DTOS.ForUpdate;
using Api.Data.Helper;
using Api.Data.IRepository;
using Api.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IOnlineShopping _onlineShoppingRepo;
        private readonly IMapper _mapper;
        private readonly IOptions<cloudinerySettings> _cloudinaryConfig;

        private Cloudinary _cloudinary;

        public ProductsController(IOnlineShopping onlineShoppingRepo, IMapper mapper,
            IOptions<cloudinerySettings> cloudinaryConfig)
        {
            _onlineShoppingRepo = onlineShoppingRepo;
            _mapper = mapper;

            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret);

            _cloudinary = new Cloudinary(acc);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var getProductsFromRepo = await _onlineShoppingRepo.GetProducts();

            var productsToReturn = _mapper.Map<IEnumerable<ProductsToReturnList>>(getProductsFromRepo);

            return Ok(productsToReturn);

        }
        [AllowAnonymous]
        [HttpGet("GetProductsForAdmin")]
        public async Task<IActionResult> GetAllProducts()
        {
            var getProductsFromRepo = await _onlineShoppingRepo.GetProductsForAdmin();

            var productsToReturn = _mapper.Map<IEnumerable<ProductsToReturnList>>(getProductsFromRepo);

            return Ok(productsToReturn);

        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            var getProductFromRepo = await _onlineShoppingRepo.GetProduct(id);

            if (getProductFromRepo == null) return NotFound();

            var productToReturn = _mapper.Map<ProductToReturnDetails>(getProductFromRepo);

            return Ok(productToReturn);
        }

        [AllowAnonymous]
        [HttpGet("category/{categoryName}")]
        public async Task<IActionResult> getProductByCategory(string categoryName)
        {
            var getProductsFromRepo = await _onlineShoppingRepo.GetProductByCategory(categoryName);

            var productsToReturn = _mapper.Map<IEnumerable<ProductsToReturnList>>(getProductsFromRepo);

            return Ok(productsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("productsSearch/{name}")]
        public async Task<IActionResult> getProductBySearch(string name)
        {
            var getProductsFromRepo = await _onlineShoppingRepo.GetProductBySearch(name);

            var productsToReturn = _mapper.Map<IEnumerable<ProductsToReturnList>>(getProductsFromRepo);

            return Ok(productsToReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductForCreation productToCreationDto)
        {
            var productModel = _mapper.Map<Products>(productToCreationDto);
            await _onlineShoppingRepo.CreateProduct(productModel);

            var productToReturn = _mapper.Map<ProductToReturnDetails>(productModel);

            return CreatedAtRoute(nameof(GetProduct), new { id = productToReturn.Id }, productToReturn);

            //    return Ok(productToReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("approvedProduct/{productId}")]
        public async Task<IActionResult> ApprovedProduct(Guid productId)
        {
            var productFormRepo = await _onlineShoppingRepo.GetProduct(productId);

            productFormRepo.IsDone = true;

            await _onlineShoppingRepo.SaveChanges();
            return Ok();
        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("unApprovedProduct/{productId}")]
        public async Task<IActionResult> unApprovedProduct(Guid productId)
        {
            var productFormRepo = await _onlineShoppingRepo.GetProduct(productId);

            productFormRepo.IsDone = false;

            await _onlineShoppingRepo.SaveChanges();
            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProduct(Guid productId, ProductForUpdate productToUpdateDto)
        {
            var productFormRepo = await _onlineShoppingRepo.GetProduct(productId);

            _mapper.Map(productToUpdateDto, productFormRepo);

            if (await _onlineShoppingRepo.SaveChanges())
                return NoContent();

            throw new Exception($"updaing Product {productId} is failed");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("deleteProduct/{productId}")]
        public async Task<IActionResult> DeleteProduct(Guid productId)
        {
            var productFormRepo = await _onlineShoppingRepo.GetProduct(productId);

            foreach (ProductColors color in productFormRepo.Colors)
                _onlineShoppingRepo.Delete(color);

            foreach (ProductSizes size in productFormRepo.Sizes)
                _onlineShoppingRepo.Delete(size);

            foreach (Photo photo in productFormRepo.Photos)
            {
                var deletePrams = new DeletionParams(photo.PublicId);

                var resault = _cloudinary.Destroy(deletePrams);

                if (resault.Result == "ok")
                {
                    _onlineShoppingRepo.Delete(photo);
                }
            }

            _onlineShoppingRepo.Delete(productFormRepo);

            if (await _onlineShoppingRepo.SaveChanges())
                return NoContent();

            throw new Exception($"updaing Product {productId} is failed");
        }
    }
}