using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpGet("login")]
    [AllowAnonymous]
    public IActionResult Login([FromQuery] string? returnUrl = null)
    {
        // If already authenticated, redirect immediately
        if (User.Identity?.IsAuthenticated == true)
        {
            return Redirect(string.IsNullOrEmpty(returnUrl) ? "/" : returnUrl);
        }

        var redirectUrl = !string.IsNullOrEmpty(returnUrl) ? returnUrl : "/";

        var properties = new AuthenticationProperties
        {
            RedirectUri = redirectUrl
        };

        return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout([FromQuery] string? returnUrl = null)
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        // Default to root if no returnUrl provided
        var redirectUrl = string.IsNullOrEmpty(returnUrl)
            ? "/"
            : returnUrl;

        return Redirect(redirectUrl);
    }

    [HttpGet("me")]
    public IActionResult GetUser()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return Ok(new { isAuthenticated = true, name = User.Identity.Name });
        }
        return Ok(new { isAuthenticated = false });
    }

    [HttpGet("status")]
    public IActionResult GetAuthStatus()
    {
        return Ok(new
        {
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
            AuthenticationType = User.Identity?.AuthenticationType
        });
    }
}
