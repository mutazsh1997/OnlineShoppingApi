using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForCreations
{
    public class PhotoForCreation
    {
        public string Url { get; set; }
        public IFormFile file { get; set; }
        public string Description { get; set; }
        public string PublicId { get; set; }


    }
}
