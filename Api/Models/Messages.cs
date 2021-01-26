using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Messages
    {
        public MailboxAddress To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public Messages(string to, string subject, string content)
        {
            To = new MailboxAddress(to);

            Subject = subject;
            Content = content;
        }
    }
}
