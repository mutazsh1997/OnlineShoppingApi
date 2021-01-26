using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForReturn
{
    public class UsersForReturn
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string CartId { get; set; }
        public int OrdedId { get; set; }

    }
}
