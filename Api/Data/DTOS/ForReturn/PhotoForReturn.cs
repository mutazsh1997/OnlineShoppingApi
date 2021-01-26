using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForReturn
{
    public class PhotoForReturn
    {
        public Guid Id { get; set; }
        public string description { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
    }
}
