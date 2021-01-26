using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.UserModel
{
    public class User: IdentityUser<int>
    {
        public string City { get; set; }
        public string Address { get; set; }
        public string CartId { get; set; }        
        public virtual ICollection <Order> Orders { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }

    }
}
