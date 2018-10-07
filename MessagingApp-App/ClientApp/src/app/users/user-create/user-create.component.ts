import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../_services/auth.service";
import { AlertifyService } from "../../_services/alertify.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { User } from "../../_models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirmPassword: ["", Validators.required]
    },
      { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value) as User;
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success("Registration successful");
      },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(["/home"]);
          });
        });
    }
  }

}
