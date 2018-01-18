using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Xml.Serialization;
using Umbraco.Web.Models;
using System;
using Umbraco.Web.PublishedContentModels;
using System.Linq;

namespace PoweredByOprum.Models
{
    public class MemberProfileViewModel
    {
        private ProfileModel ProfileModel { get; set; }

        [Display(Name = "Friendly Name")]
        public string FriendlyName { get; set; }

        [Display(Name = "Gender")]
        public string Gender { get; set; }

        [Display(Name = "Avatar")]
        public string Avatar { get; set; }

        [XmlIgnore]
        public IEnumerable<SelectListItem> GenderList { get; set; }

        [Display(Name = "Hire Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime HireDate { get; set; }

        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Display(Name = "Legal First Name")]
        public string LegalFirstName { get; set; }

        [Display(Name = "Middle Initial")]
        public string MiddleInitial { get; set; }

        [Display(Name = "Birthday")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Birthday { get; set; }

        [Display(Name = "Street Address")]
        public string StreetAddress { get; set; }

        [Display(Name = "Apt. #")]
        public string AptNumber { get; set; }

        [Display(Name = "City")]
        public string City { get; set; }

        [Display(Name = "State")]
        public string State { get; set; }

        [XmlIgnore]
        public IEnumerable<SelectListItem> StateList { get; set; }

        [Display(Name = "Zip Code")]
        public string ZipCode { get; set; }

        [Display(Name = "Personal Phone Number")]
        public string PersonalPhoneNumber { get; set; }

        [Display(Name = "Department")]
        public string Department { get; set; }

        [XmlIgnore]
        public IEnumerable<SelectListItem> DepartmentList { get; set; }

        [Display(Name = "Division")]
        public string Division { get; set; }

        [XmlIgnore]
        public IEnumerable<SelectListItem> DivisionList { get; set; }

        [Display(Name = "Emergency Contact")]
        public string EmergencyContact { get; set; }

        [Display(Name = "Office Extension")]
        public string OfficeExtension { get; set; }

        [Display(Name = "PaperWise UserName")]
        public string PaperWiseUsername { get; set; }

        [Display(Name = "PaperWise Password")]
        public string PaperWisePassword { get; set; }

        public string Email { get; set; }

        public int Id { get; set; }

        public string ProfileUrl { get; internal set; }

        public byte[] AvatarFile { get; set; }


        public MemberProfileViewModel()
        {
        }

        public static MemberProfileViewModel Create(OprumMember member, string email)
        {

            try
            {
                var newModel = new MemberProfileViewModel()
                {
                    Id = member.Id,
                    Avatar = member.Avatar?.First()?.Url,
                    Email = email,
                    LastName = member.LastName,
                    LegalFirstName = member.LegalFirstName,
                    FriendlyName = member.FriendlyName,
                    Birthday = member.Birthday,
                    Gender = member.Gender,
                    StreetAddress = member.StreetAddress,
                    AptNumber = member.AptNumber,
                    City = member.City,
                    State = member.State,
                    ZipCode = member.ZipCode,
                    PersonalPhoneNumber = member.PersonalPhoneNumber,
                    Department = member.Department,
                    Division = member.Division,
                    HireDate = member.HireDate,
                    OfficeExtension = member.OfficeExtension,
                    EmergencyContact = member.EmergencyContact,
                    PaperWisePassword = member.PaperWisePassword == null ? string.Empty : member.PaperWisePassword.ToString(),
                    PaperWiseUsername = member.PaperWiseUsername,
                };

                return newModel;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}