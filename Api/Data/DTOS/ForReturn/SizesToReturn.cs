using System;

namespace Api.Data.DTOS.ForReturn
{
    public class SizesToReturn
    {
        public int Id { get; set; }
        public string Size { get; set; }
        public bool IsSelected { get; set; }
        public Guid ProductId { get; set; }
    }
}