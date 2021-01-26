using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.IRepository;
using Api.Models;
using Api.Models.UserModel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Repository
{
    public class OnlineShopping : IOnlineShopping
    {
        private readonly DataContext _db;
        public OnlineShopping(DataContext db)
        {
            _db = db;
        }
        public void Add<T>(T entity) where T : class
        {
            _db.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
        }
        public async Task<bool> SaveChanges()
        {
            return await _db.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetMainPhotoForProduct(Guid productId)
        {
            return await _db.Photo.Where(p => p.ProductId == productId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(Guid id)
        {
            return await _db.Photo.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Products> GetProduct(Guid id)
        {
            var products = await _db.Products.Include(p => p.Photos).IgnoreQueryFilters().Include(s => s.Sizes)
                .Include(c => c.Colors).Include(c => c.category).FirstOrDefaultAsync(p => p.Id == id);
            return products;
        }

        public async Task<IEnumerable<Products>> GetProducts()
        {
            var products = _db.Products.Include(p => p.Photos).Include(c => c.category).ToListAsync();
            return await products;
        }
        public async Task<IEnumerable<Products>> GetProductsForAdmin()
        {
            var products = _db.Products.Include(p => p.Photos).Include(c => c.category).IgnoreQueryFilters().ToListAsync();
            return await products;
        }
        public async Task<ProductColors> GetColor(int id)
        {
            return await _db.Color.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<ProductSizes> GetSize(int id)
        {
            return await _db.Size.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Products> CreateProduct(Products product)
        {
            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();

            return product;
        }
        public async Task<Cart> GetCart(string cartId)
        {
            return await _db.Cart.Include(p => p.Items)
                .FirstOrDefaultAsync(Id => Id.CartId == cartId);
        }
        public async Task<Cart> CreateNewCart(Cart cart, string id)
        {
            cart.CartId = id;
            await _db.Cart.AddAsync(cart);
            await _db.SaveChangesAsync();

            return cart;
        }
        public async Task<IEnumerable<CartItem>> GetProductsFromCart(string cartId)
        {
            //return await _db.Cart.FindAsync(CartId);
            /* var cart = await _db.Cart
                 .Include(c => c.Items).FirstOrDefaultAsync(p => p.CartId == cartId);
             return cart;
            */
            return await _db.CartItem.Where(e => e.CartId == cartId).ToListAsync();
        }

        public async Task<Order> CreateNewOrder(Order order)
        {
            await _db.Orders.AddAsync(order);

            return order;
        }

        public async Task<Order> GetOrder(int orderId)
        {
            return await _db.Orders.Include(p => p.OrderDetails)
                .FirstOrDefaultAsync(Id => Id.OrderId == orderId);
        }
        public async Task<IEnumerable<Order>> GetOrders()
        {
            var order = await _db.Orders.Include(p => p.OrderDetails).ToListAsync();
            return order;
        }
        public async Task<IEnumerable<Order>> GetOrders(int userId)
        {
            return await _db.Orders.Where(u => u.User.Id == userId).ToListAsync();

        }
        public async Task<User> getUser(int userId)
        {
            return await _db.Users.FirstAsync(u => u.Id == userId);
        }
        public async Task<IEnumerable<category>> GetCategories()
        {
            return await _db.category.ToListAsync();
        }
        public async Task<category> CreateNewCategory(category category)
        {
            await _db.category.AddAsync(category);
            return category;
        }
        public async Task<category> GetCategoryById(int categoryId)
        {
            return await _db.category.FirstAsync(u => u.Id == categoryId);
        }
        public async Task<IEnumerable<Products>> GetProductByCategory(string categoryName)
        {
            return await _db.Products.Where(u => u.category.categoryName == categoryName)
                .ToListAsync();
        }
        public async Task<IEnumerable<Products>> GetProductBySearch(string name)
        {
            return await _db.Products.Where(u => u.Name.Contains(name)
            || u.ProductDescription.Contains(name))
                .ToListAsync();
        }

    }
}
