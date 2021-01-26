using Api.Data.Helper;
using Api.Data.IRepository;
using Api.Models;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Api.Data.Repository
{
    public class EmailSender : IEmailSender
    {
        private readonly IOptions<EmailConfigrations> _emailConfig;

        public EmailSender(IOptions<EmailConfigrations> emailConfigrations)
        {
            _emailConfig = emailConfigrations;
        }

        public async Task SendEmail(Messages message)
        {
            var emailMessage = await CreateEmailMessage(message);
            await Send(emailMessage);

        }


        private async Task<MimeMessage> CreateEmailMessage(Messages message)
        {
            MimeMessage emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfig.Value.From));
            emailMessage.To.Add(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };

             return emailMessage;
        }
        private async Task Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.Value.SmtpServer, _emailConfig.Value.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.Value.UserName, _emailConfig.Value.Password);
                    await client.SendAsync(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception or both.
                    
                    throw ;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

    }
}
