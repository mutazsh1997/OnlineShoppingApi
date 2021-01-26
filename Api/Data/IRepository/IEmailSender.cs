using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.IRepository
{
    public interface IEmailSender
    {
        Task SendEmail(Messages message);
    }
}
