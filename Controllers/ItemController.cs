using CafeteriaManageBackend.Models;
using CafeteriaManageBackend.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly CafeteriaDbContext _db;
        private readonly IHostingEnvironment _hostingEnvironment;
        public ItemController(CafeteriaDbContext db, IHostingEnvironment hostingEnvironment)
        {
            _db = db;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        public async Task<Object> getItems()
        {
            var items = await _db.Item.Select(x=>itemOutput(x)).ToListAsync();
            return Ok(items);
        }
        [HttpDelete("{id}/{filename}")]
        public async Task<IActionResult> deleteItem([FromRoute]int id,[FromRoute] string filename)
        {
            try
            {
                var item = await _db.Item.FirstOrDefaultAsync(x => x.id == id);
                if (item == null)
                {
                    return BadRequest();
                }
                var orders = await _db.Order.Where(o => o.item_id == id).ToListAsync();
                foreach(var order in orders)
                {
                    _db.Order.Remove(order);
                }
                var imageDelete = Path.Combine("wwwroot", "ItemImages");
                var pathToDelete = Path.Combine(Directory.GetCurrentDirectory(), imageDelete);
                var fullPath = Path.Combine(pathToDelete, filename);
                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }
                _db.Remove(item);
                _db.SaveChanges();
                return Ok("Item with ID: " + id + " Deleted");
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        [HttpPost,DisableRequestSizeLimit]
        public async Task<ActionResult> postItem([FromForm] ItemInputModel item)
        {
            if (item.img.ContentType != "image/png") { return BadRequest(); }
            if(item.img.FileName.Contains(' ')) { return BadRequest(); }
            try
            {
                var name = item.img.FileName;
                var folderName = Path.Combine("wwwroot", "ItemImages");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var fullPath = Path.Combine(pathToSave, name);
                //var dbPath = Path.Combine(folderName, name);
                if (item.img.Length > 0)
                {
                    using (var fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        item.img.CopyTo(fileStream);//file saved -> save path in database
                    }
                }
                else return BadRequest();
                var itemDataDb = new item()
                {
                    name = item.name,
                    description = item.description,
                    quantity = item.quantity,
                    price = item.price,
                    actual_price=item.actual_price,
                    img = name
                };
                var result = await _db.Item.AddAsync(itemDataDb);
                _db.SaveChanges();
                return Ok(new { name});
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal Server Error{ex}");
            }
        }
        [HttpGet("[action]/{imgName}")]
        public IActionResult retrieveItemImg([FromRoute]string imgName)
        {
            try
            {
                var path = Path.Combine(_hostingEnvironment.WebRootPath, "ItemImages", imgName);
                var imgFileStream = System.IO.File.OpenRead(path);
                return File(imgFileStream, "image/png");
            }
            catch (Exception ex)
            {
                var path = Path.Combine(_hostingEnvironment.WebRootPath, "ItemImages", "default.png");
                var imgFileStream = System.IO.File.OpenRead(path);
                return File(imgFileStream, "image/png");
            }
        }

        private static ItemOutputModel itemOutput(item item) => new ItemOutputModel
        {
            id=item.id,
            name = item.name,
            description = item.description,
            quantity = item.quantity,
            price = item.price,
            actual_price=item.actual_price,
            img = item.img
        };
    }
}
