import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-signupn',
  templateUrl: './page-signupn.component.html',
  styleUrls: ['./page-signupn.component.scss']
})
export class PageSignupnComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public onSubmit(objectForm: any): void {
    console.log(objectForm.form.value);
    const email = objectForm.form.value.email;
    const password = objectForm.form.value.password;

    this.authService.signup(email, password).subscribe(
      resp => console.log(resp)
    );
  }

}
