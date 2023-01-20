import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl:  './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  isLoading = false;

  constructor(public authServise: AuthService){}


  onLogin(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.authServise.login(form.value.email, form.value.password);
  }

}
