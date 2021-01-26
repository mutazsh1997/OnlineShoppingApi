using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForUpdate
{
    public class confirmUserEmail
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
