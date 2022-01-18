import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-signupn',
  templateUrl: './page-signupn.component.html',
  styleUrls: ['./page-signupn.component.scss']
})
export class PageSignupnComponent implements OnInit {

  signupForm : FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router
    ) { 
      this.signupForm = new FormGroup({});
    }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstNameFc: new FormControl(''),
      lastNameFc: new FormControl(''),
      emailFc: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm)]),
      passwordFc: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  public onSubmit(): void {
    console.log("value : ", this.signupForm.value);
    console.log(this.signupForm);
    const firstName = this.signupForm.value['firstNameFc'];
    const lastName = this.signupForm.value['lastNameFc'];
    const email = this.signupForm.value['emailFc'];
    const password = this.signupForm.value['passwordFc'];
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    if(email !== '' && password !== '') {
      this.authService.signup(user).subscribe(
        resp => {
          this.router.navigate(['account/signin']);
        }
      )
    } else {

    }
    /*const email = objectForm.form.value.email;
    const password = objectForm.form.value.password;

    this.authService.signup(email, password).subscribe(
      resp => console.log(resp)
    );*/
  }

}
