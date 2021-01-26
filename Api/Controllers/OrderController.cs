using System.Collections.Generic;
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
    [Route ("api/[controller]")]
    public class OrderController : ControllerBase {
        private readonly IOnlineShopping _repo;
        private readonly IMapper _mapper;

        public OrderController (IOnlineShopping shoppingRepo, IMapper mapper) {
            _repo = shoppingRepo;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost ("{cartId}")]
        public async Task<IActionResult> CreateOreder (string cartId,
            OrderForCreation orderforCreationDto) {
            var mapOrder = _mapper.Map<Order> (orderforCreationDto);
            var getUser = _repo.getUser (orderforCreationDto.UserId);

            mapOrder.User = await getUser;

            await _repo.CreateNewOrder (mapOrder);
            await _repo.SaveChanges ();
            int orderId = mapOrder.OrderId;

            var getCartFormRepo = await _repo.GetCart (cartId);
            var getOrderFromRepo = await _repo.GetOrder (orderId);

            if (getOrderFromRepo != null) {

                var mapOrderDeta = _mapper.Map<ICollection<OrderDetail>> (getCartFormRepo.Items);

                foreach (var item in mapOrderDeta) {
                    item.OrderId = orderId;
                    getOrderFromRepo.OrderDetails.Add (item);

                }

                mapOrder.OrderDetails = getOrderFromRepo.OrderDetails;

                if (await _repo.SaveChanges ()) {

                    return Ok (new {
                        orderId,
                    });
                }

            }

            return BadRequest ();
        }

        [HttpGet ("{orderId}", Name = "GetOrder")]
        public async Task<IActionResult> GetOrder (int orderId) {
            var orderFromRepo = await _repo.GetOrder (orderId);
            var order = _mapper.Map<OrderToReturn> (orderFromRepo);

            return Ok (order);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPatch("deliveringOrder")]
        public async Task<IActionResult> deliveringOrder ([FromBody] int orderId) {
            var orderFromRepo = await _repo.GetOrder (orderId);
            orderFromRepo.HasBeenShipped = true;
            await _repo.SaveChanges();
            return Ok ();
        }

        [HttpGet ("user/{userId}")]
        public async Task<IActionResult> getOrdersForUser (int userId) {
            var orderFromRepo = await _repo.GetOrders (userId);
            var orders = _mapper.Map<IEnumerable<OrderToReturn>> (orderFromRepo);

            return Ok (orders);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<IActionResult> GetOrders () {
            var getAllOrders = await _repo.GetOrders ();
            var mapOrders = _mapper.Map<IEnumerable<OrderToReturn>> (getAllOrders);

            return Ok (new {
                orders = mapOrders
            });
        }
    }
}