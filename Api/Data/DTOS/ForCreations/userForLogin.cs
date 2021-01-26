using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForCreations
{
    public class userForLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
