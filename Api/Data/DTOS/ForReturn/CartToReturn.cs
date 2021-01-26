using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForReturn
{
    public class CartToReturn
    {
        [Key]
        public string CartId { get; set; }
        public virtual ICollection<CartItemToReturn> Items { get; set; }
    }
}
