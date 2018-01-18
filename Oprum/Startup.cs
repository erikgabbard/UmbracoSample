using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using System.Web.Http;
using Umbraco.Web;

[assembly: OwinStartup(typeof(Oprum.Startup))]
namespace Oprum
{
    public class Startup : UmbracoDefaultOwinStartup
    {
        public override void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                name: "OprumApi",
                routeTemplate: "Oprum/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            base.Configuration(app);
            app.UseWebApi(config);
        }
    }
}