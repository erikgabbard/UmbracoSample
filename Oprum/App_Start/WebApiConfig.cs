using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Web.Http;

namespace Oprum
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "OprumApi",
                routeTemplate: "Oprum/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var jsonFormatter = config.Formatters.JsonFormatter;
            var jsonSettings = jsonFormatter.SerializerSettings;
            jsonSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            jsonFormatter.UseDataContractJsonSerializer = false;
        }
    }
}