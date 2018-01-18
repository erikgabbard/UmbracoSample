using Newtonsoft.Json.Linq;
using PoweredByOprum.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Umbraco.Core.Models;
using Umbraco.Web.Mvc;

namespace PoweredByOprum.Controllers
{
    [PluginController("Oprum")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UmbracoShimApiController : ApiControllerBase
    {
        [HttpPost]
        [AcceptVerbs("POST")]
        public IHttpActionResult HandleLogin([FromBody] AuthModel model)
        {
            if (string.IsNullOrEmpty(model.UserName) || string.IsNullOrEmpty(model.Password))
            {
                return Unauthorized();
            }

            if (Members.GetCurrentLoginStatus().IsLoggedIn || Members.Login(model.UserName, model.Password))
            {
                return Ok(new
                {
                    redirectUrl = string.IsNullOrEmpty(model.RedirectUrl) ? "/" : model.RedirectUrl,
                });
            }

            return Unauthorized();
        }

        [HttpPost]
        [AcceptVerbs("POST")]
        public IHttpActionResult HandleLogout([FromBody] AuthModel model)
        {
            if (Members.GetCurrentLoginStatus() != null)
            {
                Members.Logout();
            }

            return Ok(new
            {
                redirectUrl = "/"
            });
        }

        [HttpPost]
        [AcceptVerbs("POST")]
        public IHttpActionResult SaveMemberData([FromBody] MemberProfileViewModel model)
        {
            IMember member = null;

            if (model == null)
            {
                return BadRequest();
            }

            try
            {
                member = Services.MemberService.GetById(model.Id);

                member.SetValue("aptNumber", model.AptNumber);
                //member.SetValue("avatar", model.Avatar);
                //member.Username = model.Email;

                member.SetValue("birthday", model.Birthday);
                member.SetValue("city", model.City);
                member.SetValue("department", model.Department);
                member.SetValue("division", model.Division);
                member.Email = model.Email;
                member.SetValue("emergencyContact", model.EmergencyContact);
                member.SetValue("friendlyName", model.FriendlyName);
                member.SetValue("gender", model.Gender);
                member.SetValue("hireDate", model.HireDate);
                member.SetValue("lastName", model.LastName);
                member.SetValue("legalFirstName", model.LegalFirstName);
                member.SetValue("middleInitial", model.MiddleInitial);
                member.SetValue("officeExtension", model.OfficeExtension);
                member.SetValue("paperWisePassword", model.PaperWisePassword);
                member.SetValue("paperWiseUsername", model.PaperWiseUsername);
                member.SetValue("personalPhoneNumber", model.PersonalPhoneNumber);
                member.SetValue("state", model.State);
                member.SetValue("streetAddress", model.StreetAddress);
                member.SetValue("zipCode", model.ZipCode);

                member.UpdateDate = DateTime.Now;

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            Services.MemberService.Save(member);


            return Ok();
        }

        [HttpPost]
        [AcceptVerbs("POST")]
        public IHttpActionResult HandlePasswordReset([FromBody] AuthModel model)
        {
            return Ok(new
            {
                success = true,
                redirectUrl = "/"
            });
        }

        [HttpGet]
        [AcceptVerbs("GET")]
        public IHttpActionResult GetCabinetList()
        {
            try
            {
                var publishedMember = Members.GetCurrentMember();
                var token = GetAuthToken();

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized();
                }

                var uri = $"{ConfigurationManager.AppSettings["ImagingHost"]}/cabinets";
                var responseObject = GetMoralesResponse(uri, token);

                if (responseObject == null)
                {
                    return null;
                }

                return Ok(responseObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [AcceptVerbs("GET")]
        public IHttpActionResult GetDocumentList(int id)
        {
            try
            {
                int cabinetId = id;
                var responseJson = string.Empty;
                var token = GetAuthToken();

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized();
                }

                var uri = $"{ConfigurationManager.AppSettings["ImagingHost"]}/cabinets";
                var querystring = $"?cabinetId={cabinetId}&query=custmyPaperWise=-1";

                var url = $"{ConfigurationManager.AppSettings["ImagingHost"]}/search{querystring}";
                using (var client = new HttpClient())
                {
                    var request = CreateRequest(
                        url,
                        HttpMethod.Get,
                        token,
                        null);

                    responseJson = client.SendAsync(request).Result.Content.ReadAsStringAsync().Result;
                }

                var responseObject = JObject.Parse(responseJson);

                if (responseObject == null)
                {
                    return null;
                }

                return Ok(responseObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [AcceptVerbs("GET")]
        [Route("GetDocumentPages/{cabId}/{docId}")]
        public IHttpActionResult GetDocumentPages(int cabId, int docId)
        {
            try
            {
                var responseJson = string.Empty;
                var token = GetAuthToken();

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized();
                }

                var url = $"{ConfigurationManager.AppSettings["ImagingHost"]}/cabinets/{cabId}/documents/{docId}/pages/1";
                using (var client = new HttpClient())
                {
                    var request = CreateRequest(
                        url,
                        HttpMethod.Get,
                        token,
                        null);

                    responseJson = client.SendAsync(request).Result.Content.ReadAsStringAsync().Result;
                }

                var responseObject = JObject.Parse(responseJson);

                if (responseObject == null)
                {
                    return null;
                }

                return Ok(responseObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [AcceptVerbs("GET")]
        public async Task<HttpResponseMessage> GetFile(string url)
        {
            try
            {
                var token = GetAuthToken();

                if (string.IsNullOrEmpty(token))
                {
                    return null;
                    //return Unauthorized();
                }

                using (var client = new HttpClient())
                {
                    var request = CreateRequest(
                        url,
                        HttpMethod.Get,
                        token,
                        null);

                    return await client.SendAsync(request);
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        [AcceptVerbs("GET")]
        public async Task<IHttpActionResult> GetImage(string url)
        {
            try
            {
                Stream image;

                var token = GetAuthToken();

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized();
                }

                using (var client = new HttpClient())
                {
                    var request = CreateRequest(
                        url,
                        HttpMethod.Get,
                        token,
                        null);

                    image = await client.SendAsync(request).Result.Content.ReadAsStreamAsync();
                }

                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(image)
                };
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("inline");

                return ResponseMessage(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private IMember GetUmbracoMember()
        {
            IMember member = null;
            var publishedMember = Members.GetCurrentMember();

            // Be sure to compile in Release mode before pushing into production
#if DEBUG
            member = Services.MemberService.GetById(publishedMember?.Id == null ? 1152 : publishedMember.Id);
#else
            if (publishedMember != null)
	        {
		        var member = Services.MemberService.GetById(publishedMember.Id); 
	        }
#endif

            return member;
        }

        private string GetAuthToken()
        {
            try
            {
                var member = GetUmbracoMember();

                if (member == null)
                {
                    return string.Empty;
                }

                ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(AcceptAllCertifications);
                using (var client = new HttpClient())
                {
                    var request = CreateRequest(
                        ConfigurationManager.AppSettings["IdentityUrl"],
                        HttpMethod.Post,
                        string.Empty,
                        new Dictionary<string, string>
                        {
                            { "client_id", "quest" },
                            { "client_secret", "E3A6CEF3-D7F3-4028-83D4-0EA3C30721A4" },
                            { "grant_type", "password" },
                            { "scope", "openid profile offline_access api" },
                            { "username", (string)member.GetValue("paperWiseUsername") },
                            { "password", (string)member.GetValue("paperWisePassword") }
                        });

                    var responseJson = client.SendAsync(request).Result.Content.ReadAsStringAsync();
                    var payload = JObject.Parse(responseJson.Result);

                    return payload["access_token"].Value<string>();
                }
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        private static HttpRequestMessage CreateRequest(string url, HttpMethod method, string authToken, Dictionary<string, string> contentBody)
        {
            var request = new HttpRequestMessage(method, url);

            if (!string.IsNullOrEmpty(authToken))
            {
                request.Headers.Add("Authorization", $"Bearer {authToken}");
            }

            if (contentBody != null)
            {
                request.Content = new FormUrlEncodedContent(contentBody);
            }

            return request;
        }

        private static bool AcceptAllCertifications(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }

        private static JObject GetMoralesResponse(string url, string token)
        {
            var responseJson = string.Empty;

            using (var client = new HttpClient())
            {
                var request = CreateRequest(
                    url,
                    HttpMethod.Get,
                    token,
                    null);

                responseJson = client.SendAsync(request).Result.Content.ReadAsStringAsync().Result;
            }

            return JObject.Parse(responseJson);
        }

    }
}