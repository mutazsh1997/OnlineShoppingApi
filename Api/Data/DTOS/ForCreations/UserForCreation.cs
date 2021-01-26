using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForCreations
{
    public class UserForCreation
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(34, MinimumLength = 8, ErrorMessage = "min length should be 8")]
        public string Password { get; set; }
        public string cartId { get; set; }

    }
}
