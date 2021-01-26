using Api.Data.DTOS;
using Api.Data.DTOS.ForCreations;
using Api.Data.DTOS.ForReturn;
using Api.Data.DTOS.ForUpdate;
using Api.Models;
using Api.Models.UserModel;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.Helper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            //for read
            CreateMap<Products, ProductToReturnDetails>()
                .ForMember(
                 dest => dest.PhotoUrl,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Products, ProductsToReturnList>()
                 .ForMember(
                 dest => dest.PhotoUrl,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Photo, PhotosForReturn>();
            CreateMap<Photo, PhotoForReturn>();
            CreateMap<ProductColors, ColorsToReturn>();
            CreateMap<ProductSizes, SizesToReturn>();
            CreateMap<CartItem, CartItemToReturn>();
            CreateMap<Cart, CartToReturn>();
            CreateMap<User, UsersForReturn>();
            CreateMap<Order, OrderToReturn>();
            CreateMap<OrderDetail, OrderDetailToReturn>();
            CreateMap<category, categoryToReturn>();
            CreateMap<UsersForReturn, User>();

            //for create
            CreateMap<ProductForCreation, Products>();
            CreateMap<ProductForUpdate, Products>();
            CreateMap<PhotoForCreation, Photo>();
            CreateMap<ColorForCreation, ProductColors>();
            CreateMap<SizeForCreation, ProductSizes>();
            CreateMap<CartForCreation, CartItem>();
            CreateMap<OrderForCreation, Order>();
            CreateMap<UserForCreation, User>();
            CreateMap<UserForUpdate, User>();
            CreateMap<categoryForCreation, category>();
            CreateMap<CartItem, OrderDetail>();
        }
    }
}
