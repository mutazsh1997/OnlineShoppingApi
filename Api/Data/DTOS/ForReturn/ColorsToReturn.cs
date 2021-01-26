using System;

namespace Api.Data.DTOS.ForReturn
{
    public class ColorsToReturn
    {
        public int Id { get; set; }
        public string Color { get; set; }
        public bool IsSelected { get; set; }
        public Guid ProductId { get; set; }
    }
}