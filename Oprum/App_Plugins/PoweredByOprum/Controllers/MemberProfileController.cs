//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web.Mvc;
//using Umbraco.Web.Mvc;
//using Umbraco.Web.PublishedContentModels;


//namespace PoweredByOprum.Controllers
//{
//    [PluginController("Oprum")]
//    public class MemberProfileController : SurfaceController
//    {
//        #region Member Profile

//        [ChildActionOnly]
//        public ActionResult ShowProfile(int memberId)
//        {
//            var memberID = Members.GetCurrentMemberId().ToString();

//            Umbraco.Core.Models.IMember member = null;

//            var loggedInMember = Services.MemberService.GetById(Members.GetCurrentMemberId());

//            if (!string.IsNullOrEmpty(memberID))
//            {
//                //member = Services.MemberService.GetMembersByPropertyValue("dealerID", memberID).FirstOrDefault();
//                member = loggedInMember;
//            }
//            else
//            {
//                member = Services.MemberService.GetById(memberId);
//            }

//            if (member == null)
//            {
//                throw new ArgumentException($"Member for not found.");
//            }

//            var umbMember = Members.GetById(member.Id);
//            var username = member.Username;
//            var email = Umbraco.Member(member.Id).Email;
//            var password = Umbraco.Member(member.Id).Password;
//            var memberModel = new OprumMember(umbMember);

//            ProfileInfoViewModel model = Models.ProfileInfoViewModel.Create(memberModel, username, email, password);

//            model.PaperWisePassword = member.Properties[OprumMember.GetModelPropertyType(p => p.PaperWisePassword).PropertyTypeAlias]?.Value?.ToString() ?? string.Empty;

//            var stateAlias = OprumMember.GetModelPropertyType(m => m.State).PropertyTypeAlias;
//            model.StateList = GetMemberPrevalue(member.Id, stateAlias, model);
//            model.State = member.Properties[OprumMember.GetModelPropertyType(p => p.State)?.PropertyTypeAlias].Value.ToString();

//            var genderAlias = OprumMember.GetModelPropertyType(m => m.Gender).PropertyTypeAlias;
//            model.GenderList = GetMemberPrevalue(member.Id, genderAlias, model);
//            model.Gender = member.Properties[OprumMember.GetModelPropertyType(p => p.Gender).PropertyTypeAlias].Value.ToString();

//            var departmentAlias = OprumMember.GetModelPropertyType(m => m.Department).PropertyTypeAlias;
//            model.DepartmentList = GetMemberPrevalue(member.Id, departmentAlias, model);
//            model.Department = member.Properties[OprumMember.GetModelPropertyType(p => p.Department).PropertyTypeAlias].Value.ToString();

//            var divisionAlias = OprumMember.GetModelPropertyType(m => m.Division).PropertyTypeAlias;
//            model.DivisionList = GetMemberPrevalue(member.Id, divisionAlias, model);
//            model.Division = member.Properties[OprumMember.GetModelPropertyType(p => p.Division).PropertyTypeAlias].Value.ToString();

//            return View(model);
//        }

//        private IEnumerable<SelectListItem> GetMemberPrevalue(int memberId, string propertyAlias, ProfileInfoViewModel model)
//        {
//            var memberService = Services.MemberService;
//            var member = memberService.GetById(memberId);

//            return member.GetPropertyPrevalues(propertyAlias)
//                .Select(i => new SelectListItem()
//                {
//                    Text = i.Value,
//                    Value = i.Id.ToString()
//                });

//        }

//        [Authorize]
//        public ActionResult HandleUpdateMemberDetails(ProfileInfoViewModel model)
//        {
//            if (ModelState.IsValid == false)
//            {
//                return CurrentUmbracoPage();
//            }

//            var memberService = Services.MemberService;
//            var member = memberService.GetById(model.MemberId);



//            member.Email = model.Email;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.LegalFirstName).PropertyTypeAlias].Value = model.LegalFirstName;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.LastName).PropertyTypeAlias].Value = model.LastName;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.MiddleInitial).PropertyTypeAlias].Value = model.MiddleInitial;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.FriendlyName).PropertyTypeAlias].Value = model.FriendlyName;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.Birthday).PropertyTypeAlias].Value = model.Birthday;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.Gender).PropertyTypeAlias].Value = model.Gender;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.Address1).PropertyTypeAlias].Value = model.Address1;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.Address2).PropertyTypeAlias].Value = model.Address2;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.City).PropertyTypeAlias].Value = model.City;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.State).PropertyTypeAlias].Value = model.State;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.ZipCode).PropertyTypeAlias].Value = model.ZipCode;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.PersonalPhoneNumber).PropertyTypeAlias].Value = model.PersonalPhoneNumber;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.Department).PropertyTypeAlias].Value = model.Department;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.Division).PropertyTypeAlias].Value = model.Division;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.HireDate).PropertyTypeAlias].Value = model.HireDate;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.OfficeExtension).PropertyTypeAlias].Value = model.OfficeExtension;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.EmergencyContact).PropertyTypeAlias].Value = model.EmergencyContact;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.PaperWiseUsername).PropertyTypeAlias].Value = model.PaperWiseUsername;
//            member.Properties[OprumMember.GetModelPropertyType(p => p.PaperWisePassword).PropertyTypeAlias].Value = model?.PaperWisePassword?.ToString() ?? string.Empty;



//            memberService.Save(member);

//            if (Members.IsLoggedIn())
//            {
//                ViewBag.DetailSuccessfullyChanged = 1;
//                return CurrentUmbracoPage();
//            }

//            return View(model);
//        }

//        #endregion


//        #region Password Change

//        [ChildActionOnly]
//        public ActionResult ShowPasswordField(int memberId)
//        {

//            var umbMember = Members.GetCurrentMember();
//            var email = Umbraco.Member(memberId).Email;
//            var password = Umbraco.Member(memberId).Password;
//            var memberModel = new OprumMember(umbMember);

//            var model = ChangePasswordViewModel.Create(memberModel, email, password);

//            return View("ChangePasswordView", model);
//        }


//        [Authorize]
//        public ActionResult HandleUpdateMemberPassword(ChangePasswordViewModel model)
//        {
//            try
//            {
//                if (ModelState.IsValid == false)
//                {
//                    return CurrentUmbracoPage();
//                }

//                var memberService = Services.MemberService;
//                var member = memberService.GetById(Members.GetCurrentMemberId());

//                memberService.SavePassword(member, model.NewPassword);
//                memberService.Save(member);

//                if (Umbraco.MemberIsLoggedOn())
//                {
//                    TempData["UpdateSuccess"] = true;
//                    return CurrentUmbracoPage();
//                }
//            }
//            catch (MembershipPasswordException mex)
//            {
//                Trace.Write(mex.ToString());
//                TempData["ErrorMessage"] = mex.Message;
//            }
//            catch (Exception ex)
//            {
//                Trace.Write(ex.ToString());
//                TempData["ErrorMessage"] = "An Error Occured while updating your password. Please contact your administrator.";
//            }

//            TempData["UpdateSuccess"] = false;
//            return CurrentUmbracoPage();
//        }

//        #endregion
//    }
//}