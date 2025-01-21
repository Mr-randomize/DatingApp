using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helper
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if(context.HttpContext.User.Identity?.IsAuthenticated != true) return;

            var userid = resultContext.HttpContext.User.GetUserId();

            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
            var user = await repo.UserRepository.GetUserByIdAsync(userid);
            if(user == null) return;
            user.LastActive = DateTime.UtcNow;
            await repo.Complete();
        }
    }
}
