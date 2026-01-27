using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace web_api
{
    public class SWAAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder) : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
    {
        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            // 1. Get the header
            if (!Request.Headers.TryGetValue("x-ms-client-principal", out var header))
            {
                return Task.FromResult(AuthenticateResult.NoResult());
            }

            var headerValue = header.FirstOrDefault();
            if (string.IsNullOrEmpty(headerValue))
            {
                return Task.FromResult(AuthenticateResult.NoResult());
            }

            try
            {

                // 2. Decode Base64
                var data = Convert.FromBase64String(headerValue);
                var decoded = Encoding.UTF8.GetString(data);
                var principal = JsonSerializer.Deserialize<ClientPrincipal>(decoded, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

                if (principal == null || string.IsNullOrEmpty(principal.UserId))
                {
                    return Task.FromResult(AuthenticateResult.Fail("Invalid client principal"));
                }

                // 3. Create Claims
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, principal.UserId),
                    new Claim(ClaimTypes.Name, principal.UserDetails ?? string.Empty)
                };
                claims.AddRange(principal.UserRoles?.Select(r => new Claim(ClaimTypes.Role, r)) ?? Enumerable.Empty<Claim>());

                var identity = new ClaimsIdentity(claims, principal.IdentityProvider ?? "SWAAuth");
                var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), "SWAAuth");

                return Task.FromResult(AuthenticateResult.Success(ticket));
            }
            catch (Exception ex)
            {
                return Task.FromResult(AuthenticateResult.Fail($"Failed to authenticate: {ex.Message}"));
            }
        }
    }

    public class ClientPrincipal
    {
        public string UserId { get; set; } = string.Empty;
        public string UserDetails { get; set; } = string.Empty;
        public string? IdentityProvider { get; set; }
        public List<string>? UserRoles { get; set; }
    }
}
