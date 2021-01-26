using System;
using System.Collections.Generic;

namespace Api.Data.DTOS.ForCreations
{
    public class OrderForCreation
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime OrderDate { get; set; }
        public bool HasBeenShipped { get; set; } = false;
        public decimal Total { get; set; }
        public int UserId { get; set; }
        public OrderForCreation()
        {
            OrderDate = DateTime.Now;
        }
    }
}
