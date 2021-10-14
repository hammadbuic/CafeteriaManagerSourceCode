using CafeteriaManageBackend.Models;
using CafeteriaManageBackend.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace CafeteriaManageBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly CafeteriaDbContext _db;
        public OrdersController(CafeteriaDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        //[Authorize("Admin")]
        public async Task<Object> getOrders()
        {
            var items = await _db.Order.Select(x => orderInput(x)).ToListAsync();
            return Ok(items);
        }
        [HttpGet("[action]")]
        //[Authorize("Admin")]
        public async Task<Object> getOrdersForAdmin()
        {
            var orders = await _db.Item.Include(x => x.orders.OrderByDescending(a=>a.id)).OrderByDescending(a=>a.id).ToListAsync();
            return Ok(orders);
        }
        [HttpPut]
        public async Task<IActionResult> putOrders(OrderInputDTO order)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            var uOrder = await _db.Order.FirstOrDefaultAsync(i => i.id == order.id);
            if (uOrder == null) { return NotFound(); }
            uOrder.status = order.status;
            _db.Entry(uOrder).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _db.SaveChangesAsync();
            return Ok("Order with ID " + order.id + " is delivered");
        }
        [HttpPost]
        public async Task<IActionResult> postOrder(OrderInputDTO inOrder)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            var order = new Order()
            {
                customer_name = inOrder.customer_name,
                delivery_address = inOrder.delivery_address,
                order_time = inOrder.order_time,
                item_id = inOrder.item_id,
                order_quantity = inOrder.order_quantity,
                status = false
            };
            var result = await _db.Order.AddAsync(order);
            _db.SaveChanges();
            return Ok("Order Added Success");
        }
        [HttpDelete("{id}")]
        public IActionResult deleteOrder([FromRoute] int id)
        {
            var order = _db.Order.FirstOrDefault(o => o.id == id);
            if (order == null)
            {
                return BadRequest();
            }
            _db.Order.Remove(order);
            _db.SaveChanges();
            return Ok("Order with ID: " + id + " is Deleted");
        }
        private static OrderInputDTO orderInput(Order order) => new OrderInputDTO
        {
            id=order.id,
            customer_name=order.customer_name,
            order_quantity=order.order_quantity,
            delivery_address=order.delivery_address,
            order_time=order.order_time,
            item_id=order.item_id,
            status=order.status
        };
    }
}
