using Api.Models;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Api.Data.DTOS.ForReturn
{
    public class categoryToReturn
    {
        public int id { get; set; }
        public string categoryName { get; set; }
        public int productCount { get; set; }
 
    }
}