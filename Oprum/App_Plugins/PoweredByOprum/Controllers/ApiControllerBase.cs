using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Web.Http;
using Umbraco.Web.WebApi;

namespace PoweredByOprum.Controllers
{
    public abstract class ApiControllerBase : UmbracoApiController
    {
        public ApiControllerBase()
        {
            var jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            var jsonSettings = jsonFormatter.SerializerSettings;
            jsonSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            jsonSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
            jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            jsonFormatter.UseDataContractJsonSerializer = false;
        }
    }
}