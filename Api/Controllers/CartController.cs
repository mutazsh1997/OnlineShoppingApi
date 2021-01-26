using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Data.DTOS.ForCreations;
using Api.Data.DTOS.ForReturn;
using Api.Data.IRepository;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers {

    [AllowAnonymous]
    [ApiController]
    [Route ("api/[controller]")]
    public class CartController : ControllerBase {
        private readonly IOnlineShopping _repo;
        private readonly IMapper _mapper;

        public CartController (IOnlineShopping repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet ("{cartId}", Name = "GetCart")]
        public async Task<IActionResult> GetCart (string cartId) {
            var cartFromRepo = await _repo.GetCart (cartId);
            var cart = _mapper.Map<CartToReturn> (cartFromRepo);

            return Ok (cart);
        }

        [HttpPost ("{ProductId}/{cartId}")]
        public async Task<IActionResult> AddToCart (string cartId, Guid ProductId, CartForCreation cartForCreationDto) {

            if (await _repo.GetCart (cartId) == null)
                await _repo.CreateNewCart (new Cart (), cartId);

            var getCartFormRepo = await _repo.GetCart (cartId);
            var getProductFromRepo = await _repo.GetProduct (ProductId);

            if (getProductFromRepo != null) {
                var cartItem = _mapper.Map<CartItem> (cartForCreationDto);

                foreach (CartItem item in getCartFormRepo.Items) {
                    if (item.ProductId == ProductId) {
                        cartItem.ProductId = ProductId;

                        item.Quantity++;
                        if (await _repo.SaveChanges ()) {
                            var cartItemToReturn = _mapper.Map<CartItemToReturn> (item);
                            return CreatedAtRoute (nameof (GetCart), new { cartId, item.ItemId }, cartItemToReturn);
                        }
                    }
                }

                cartItem.ProductId = ProductId;
                cartItem.ProductName = getProductFromRepo.Name;
                cartItem.ProductPrice = getProductFromRepo.Price;
                cartItem.ProductPhoto = getProductFromRepo.Photos.FirstOrDefault ().Url;

                getCartFormRepo.Items.Add (cartItem);

                if (await _repo.SaveChanges ()) {

                    var cartItemToReturn = _mapper.Map<CartItemToReturn> (cartItem);
                    return CreatedAtRoute (nameof (GetCart), new { cartId, cartItem.ItemId }, cartItemToReturn);
                }

            }
            return BadRequest ("there is an err ");
        }

        [HttpDelete ("{productId}/{cartId}")]
        public async Task<IActionResult> deleteItemFromCart (Guid productId, string cartId) {
            var getCartFormRepo = await _repo.GetCart (cartId);
            var getProductFromRepo = await _repo.GetProduct (productId);

            if (getProductFromRepo != null) {

                if (getProductFromRepo.Id == productId) {
                    getCartFormRepo.Items.Remove (getCartFormRepo.Items.First (p => p.ProductId == productId));
                }
            }
            if (await _repo.SaveChanges ()) {
                return NoContent ();
            }
            return BadRequest ("item can't remove");

        }
        //create new Id for Angular session
        [HttpGet ("CartId")]
        public string GetCartKey () {

            string cartId = Guid.NewGuid ().ToString ();
            return cartId;

        }

        [HttpPatch]
        public async Task<IActionResult> updateQuatity ([FromQuery] string cartId, [FromQuery] int itemId, [FromBody] int quantity) {

            var getCart = await _repo.GetCart (cartId);
            var item = getCart.Items.FirstOrDefault (p => p.ItemId == itemId);

            item.Quantity = quantity;

            await _repo.SaveChanges ();
            return NoContent ();

        }
    }
}