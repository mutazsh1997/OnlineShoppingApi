using System;
using System.Threading.Tasks;
using Api.Data.DTOS.ForCreations;
using Api.Data.DTOS.ForReturn;
using Api.Data.IRepository;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers {
    [ApiController]
    [Route ("api/product/[controller]")]
    public class SizeController : ControllerBase {
        private readonly IOnlineShopping _onlineShoppingRepo;
        private readonly IMapper _mapper;
        public SizeController (IOnlineShopping onlineShoppingRepo, IMapper mapper) {
            _onlineShoppingRepo = onlineShoppingRepo;
            _mapper = mapper;
        }

        [HttpGet ("{id}", Name = "GetSize")]
        public async Task<IActionResult> GetSize (int id) {
            var getSizeFromRepo = await _onlineShoppingRepo.GetSize (id);

            return Ok (getSizeFromRepo);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost ("{productId}")]
        public async Task<IActionResult> AddSize (Guid productId, SizeForCreation sizeForCreationDTO) {
            var product = await _onlineShoppingRepo.GetProduct (productId);

            var sizeModel = _mapper.Map<ProductSizes> (sizeForCreationDTO);

            product.Sizes.Add (sizeModel);

            if (await _onlineShoppingRepo.SaveChanges ()) {
                var size = _mapper.Map<SizesToReturn> (sizeModel);

                size.ProductId = productId;

                return CreatedAtRoute (nameof (GetSize), new { productId, id = size.Id }, size);
            }
            return BadRequest ("Size DoesNotAdd to product");
        }
    }
}