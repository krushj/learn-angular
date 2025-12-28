import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../email-service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';


enum USER_ROLE {
  ADMIN,
  USER
};
enum USER_TYPE {
  PERSONAL,
  BUSINESS
}

interface IForm {
  type: USER_TYPE;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: USER_ROLE
  skills: string[]
}

interface IUserForm extends IForm { }

interface IBussinessUserForm extends IForm {
  companyName: string
  gstNumber: string;
  totalEmployees: number;
}

type Form = IUserForm | IBussinessUserForm;


@Component({
  selector: 'app-reactive-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [EmailService],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveForm {

  form: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.form = this.fb.group({
      type: new FormControl('PERSONAL', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      // value => sync validators => async validators
      email: new FormControl('', [Validators.required, Validators.email], [this.validateExistingEmail.bind(this)]),
      password: new FormControl('', [Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      skills: new FormArray([]),

      // required only when user selected user type as bussiness
      companyName: new FormControl(''),
      gstNumber: new FormControl(''),
      totalEmployees: new FormControl(''),
    },
      // form level validator
      { validators: this.matchPasswordCheck }
    )
    this.form.get('type')?.valueChanges.subscribe(this.addConditionalValidations)
    this.addConditionalValidations(this.type.value)

  }

  get type() {
    return this.form.get('type') as FormControl;
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
  
  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;
  }

  get role() {
    return this.form.get('role') as FormControl;
  }

  get skills() {
    return this.form?.get('skills') as FormArray;
  }


  get companyName() {
    return this.form.get('companyName') as FormControl;
  }

  get gstNumber() {
    return this.form.get('gstNumber') as FormControl;
  }

  get totalEmployees() {
    return this.form.get('totalEmployees') as FormControl;
  }

  addConditionalValidations = (type: string) => {

    if (type === 'PERSONAL') {
      // clear all validators
      this.companyName.clearValidators()
      this.gstNumber.clearValidators()

      this.companyName.disable()
      this.gstNumber.disable()
      this.totalEmployees.disable()

    } else {
      this.companyName.addValidators(Validators.required)
      this.gstNumber.addValidators([Validators.required, Validators.pattern(/^[0-9A-Z]{15}$/)])

      this.companyName.enable()
      this.gstNumber.enable()
      this.totalEmployees.enable()

    }

    this.companyName.updateValueAndValidity();
    this.gstNumber.updateValueAndValidity();
    this.totalEmployees.updateValueAndValidity();
  }

  validateExistingEmail = async (control: AbstractControl) => {
    const allEmails = await lastValueFrom(this.emailService.getExistingEmails())
    return allEmails.has(control.value) ? { emailTaken: true } : null;
  }

  matchPasswordCheck = () => {
    if(this.form && this.password && this.confirmPassword && this.password.value == this.confirmPassword.value){
      return { passwordMissmatch: false };
    }
    return null;

  }

  addSkill = () => this.skills.push(new FormControl('', Validators.required));

  removeSkill = (index: number) => this.skills.removeAt(index);

  formSubmit = () => {
    const formResponse: Form = this.form?.value
    console.log(formResponse)
  }

}
