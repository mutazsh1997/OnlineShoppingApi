using Api.Models;
using Api.Models.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.IRepository
{
    public interface IOnlineShopping
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChanges();
        Task<Products> CreateProduct(Products product);
        Task<IEnumerable<Products>> GetProducts();
        Task<IEnumerable<Products>> GetProductsForAdmin();
        Task<Products> GetProduct(Guid id);
        Task<Photo> GetPhoto(Guid id);
        Task<Photo> GetMainPhotoForProduct(Guid productId);
        Task<ProductSizes> GetSize(int id);
        Task<ProductColors> GetColor(int id);
        Task<IEnumerable<CartItem>> GetProductsFromCart(string cartId);
        Task<Cart> GetCart(string cartId);
        Task<Cart> CreateNewCart(Cart cart, string cartId);
        Task<Order> CreateNewOrder(Order order);
        Task<Order> GetOrder(int orderId);
        Task<IEnumerable<Order>> GetOrders(int userId);
        Task<User> getUser(int userId);
        Task<IEnumerable<Order>> GetOrders();
        Task<IEnumerable<category>> GetCategories();
        Task<category> CreateNewCategory(category category);
        Task<IEnumerable<Products>> GetProductByCategory(string categoyName);
        Task<IEnumerable<Products>> GetProductBySearch(string name);
        Task<category> GetCategoryById(int categoryId);
    }
}
