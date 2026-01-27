using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.RateLimiting;

namespace web_api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication("SWAAuth")
                .AddScheme<AuthenticationSchemeOptions, SWAAuthHandler>("SWAAuth", options => {
                    // Add validation options if needed
                });

            // Explicitly require authentication for everything
            
#if !DEBUG
            builder.Services.AddAuthorizationBuilder()
                .SetFallbackPolicy(new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build());
#endif

            builder.Services.AddAuthorization();


            // add rate limiter
            /*            builder.Services.AddRateLimiter(options =>
                        {
                            options.AddFixedWindowLimiter("api", opt =>
                            {
                                opt.Window = TimeSpan.FromMinutes(1);
                                opt.PermitLimit = 100;
                            });
                        });*/


            builder.Services.AddControllers();
            builder.Services.AddHealthChecks();

            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            // Register as Singleton - Parsed once at Startup
            builder.Services.AddSingleton<ContentService>();

            var app = builder.Build();

            // see: /openapi/v1.json 
            app.MapOpenApi().AllowAnonymous();

            // Only redirect to HTTPS in production
            if (!app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.Use(async (context, next) =>
            {
                context.Response.OnStarting(() =>
                {
                    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
                    context.Response.Headers.Append("X-Frame-Options", "DENY");
                    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
                    context.Response.Headers.Append("X-Permitted-Cross-Domain-Policies", "none");
                    context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
                    return Task.CompletedTask;
                });

                try
                {
                    await next();
                }
                catch (OperationCanceledException)
                {
                    // common during redirects e.g. from Login/Challenge
                }
            });

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.MapHealthChecks("/api/health").AllowAnonymous();

            app.Run();
        }


        


    }
}
