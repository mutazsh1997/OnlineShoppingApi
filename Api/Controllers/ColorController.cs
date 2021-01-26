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
    public class ColorController : ControllerBase {
        private readonly IOnlineShopping _onlineShoppingRepo;
        private readonly IMapper _mapper;
        public ColorController (IOnlineShopping onlineShoppingRepo, IMapper mapper) {
            _onlineShoppingRepo = onlineShoppingRepo;
            _mapper = mapper;
        }

        [HttpGet ("{id}", Name = "GetColor")]
        public async Task<IActionResult> GetColor (int id) {
            var getColorFromRepo = await _onlineShoppingRepo.GetColor (id);

            return Ok (getColorFromRepo);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost ("{productId}")]
        public async Task<IActionResult> AddColor (Guid productId, ColorForCreation colorForCreationDTO) {
            var product = await _onlineShoppingRepo.GetProduct (productId);

            var ColorModel = _mapper.Map<ProductColors> (colorForCreationDTO);

            product.Colors.Add (ColorModel);

            if (await _onlineShoppingRepo.SaveChanges ()) {
                var color = _mapper.Map<ColorsToReturn> (ColorModel);

                color.ProductId = productId;

                return CreatedAtRoute (nameof (GetColor), new { productId, id = color.Id }, color);
            }
            return BadRequest ("Color DoesNotAdd to product");
        }
    }
}