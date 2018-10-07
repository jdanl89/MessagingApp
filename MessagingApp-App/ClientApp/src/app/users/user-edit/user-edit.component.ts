import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { User } from "../../_models/user";
import { AlertifyService } from "../../_services/alertify.service";
import { AuthService } from "../../_services/auth.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user")) as User;
  editProfile: boolean = false;
  editForm: FormGroup = this.fb.group({
    username: [this.user.username, Validators.required]
  });

  changePasswordForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    oldPassword: ["", [Validators.required]],
    newPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    confirmPassword: ["", Validators.required],
  },
    { validator: this.passwordMatchValidator });

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.user = data["user"] as User;
      },
      () => {
        this.alertify.error("failed to load user info");
      });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("newPassword").value === g.get("confirmPassword").value ? null : { 'mismatch': true };
  }

  updateUser() {
    this.user.username = this.editForm.get("username").value;

    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      (res: User) => {
        this.alertify.success("Profile updated successfully");
        this.user = res;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.editForm.reset(this.user);
        this.editProfile = false;
      },
      error => {
        this.alertify.error(error);
      });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      let model = {
        username: this.changePasswordForm.get("username").value,
        oldPassword: this.changePasswordForm.get("oldPassword").value,
        newPassword: this.changePasswordForm.get("newPassword").value
      }

      this.authService.changePassword(model).subscribe(
        () => {
          this.alertify.success("Password updated successfully");
          this.changePasswordForm.reset();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }
}
