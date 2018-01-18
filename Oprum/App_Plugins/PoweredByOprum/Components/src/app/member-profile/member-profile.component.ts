import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UmbracoShimService } from '../services/umbraco-shim.service';
import { OprumMember } from '../domain/oprum-member';
import { environment } from '../../environments/environment';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
const ZIP_REGEX = /^\d{5}(?:[-\s]\d{4})?$/;

@Component({
  selector: 'member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
  providers: [UmbracoShimService]
})
export class MemberProfileComponent implements OnInit {
  member: OprumMember;
  profileForm: FormGroup;

  genders = ['Male', 'Female'];
  departments = [];
  divisions = [];
  states = [];

  constructor(
    public formBuilder: FormBuilder,
    private umbracoService: UmbracoShimService,
    private elementRef: ElementRef) {

    this.member = JSON.parse(this.elementRef.nativeElement.getAttribute('member'));
    this.departments = JSON.parse(this.elementRef.nativeElement.getAttribute('departments'));
    this.divisions = JSON.parse(this.elementRef.nativeElement.getAttribute('divisions'));
    this.states = JSON.parse(this.elementRef.nativeElement.getAttribute('states'));

    if (this.member.Avatar == null || this.member.Avatar === undefined) {
      this.member.Avatar = 'assets/img/userprofile.png';
    }

    this.profileForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
      'friendlyName': [null, Validators.required],
      'firstName': [null, Validators.required],
      'middleInitial': [null, null],
      'lastName': [null, Validators.required],
      'personalPhoneNumber': [null, Validators.compose([Validators.required, Validators.pattern(PHONE_REGEX)])],
      'streetAddress': [null, Validators.required],
      'aptNo': [null, null],
      'city': [null, Validators.required],
      'state': [null, Validators.required],
      'zipCode': [null, Validators.compose([Validators.required, Validators.pattern(ZIP_REGEX)])],
      'birthday': [null, Validators.required],
      'gender': [null, Validators.required],
      'emergencyContact': [null, Validators.required],
      'department': [null, Validators.required],
      'division': [null, Validators.required],
      'officeExtension': [null, Validators.required],
      'hireDate': [null, Validators.required],
      'paperWiseUsername': [null, null],
      'paperWisePassword': [null, null],
    })
  }

  ngOnInit() {
    this.member.HireDate = new Date();
    this.member.Birthday = new Date();
  }

  editAvatar(event: any) {
    this.member.Avatar = event.target.files[0].name;
    this.member.AvatarFile = event.target.files[0];
    alert(event.target.files[0].name);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.umbracoService.saveMember(this.member)
        .subscribe(url => {
          //maybe display a saved message
        });
    }
  }
}
