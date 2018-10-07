import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxGalleryModule } from "ngx-gallery";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import { AuthGuard } from "./_guards/auth.guard";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ConversationCreateComponent } from "./conversations/conversation-create/conversation-create.component";
import { ConversationDetailComponent } from "./conversations/conversation-detail/conversation-detail.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";
import { UserCreateComponent } from "./users/user-create/user-create.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import { ConversationDetailResolver } from "./_resolvers/conversation/conversation-detail.resolver";
import { ConversationEditResolver } from "./_resolvers/conversation/conversation-edit.resolver";
import { UserDetailResolver } from "./_resolvers/user/user-detail.resolver";
import { UserEditResolver } from "./_resolvers/user/user-edit.resolver";
import { AlertifyService } from "./_services/alertify.service";
import { AuthService } from "./_services/auth.service";
import { ConversationService } from "./_services/conversation.service";
import { MessageService } from "./_services/message.service";
import { MessageReactionService } from "./_services/messageReaction.service";
import { SignalRService } from "./_services/signalR.service";
import { UserService } from "./_services/user.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BsDropdownModule } from "ngx-bootstrap";
import { appRoutes } from "./routes";
import { TabsModule } from "ngx-bootstrap/tabs/tabs.module";
import { FileUploadModule } from "ng2-file-upload";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ButtonsModule } from "ngx-bootstrap/buttons/buttons.module";

export function getAccessToken(): string {
  return localStorage.getItem("token");
}

export const jwtConfig = {
  tokenGetter: getAccessToken,
  whiteListedDomains: ["localhost:5000"]
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConversationCreateComponent,
    ConversationDetailComponent,
    MessageListComponent,
    UserCreateComponent,
    UserEditComponent,
    SideNavComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: jwtConfig
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AlertifyService,
    AuthService,
    AuthGuard,
    ConversationService,
    MessageService,
    MessageReactionService,
    UserService,
    JwtHelperService,
    SignalRService,
    ConversationDetailResolver,
    ConversationEditResolver,
    UserDetailResolver,
    UserEditResolver,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
