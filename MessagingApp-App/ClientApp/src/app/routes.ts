import { Routes } from "@angular/router";
import { AuthGuard } from "./_guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { ConversationCreateComponent } from "./conversations/conversation-create/conversation-create.component";
import { ConversationDetailComponent } from "./conversations/conversation-detail/conversation-detail.component";
import { UserCreateComponent } from "./users/user-create/user-create.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { ConversationDetailResolver } from "./_resolvers/conversation/conversation-detail.resolver";
import { UserEditResolver } from "./_resolvers/user/user-edit.resolver";


export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "",
    component: HomeComponent,
    runGuardsAndResolvers: "always"
  },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "users/create",
        component: UserCreateComponent
      },
      {
        path: "users/:id/edit",
        component: UserEditComponent,
        resolve: { user: UserEditResolver }
      },
      {
        path: "conversations/create",
        component: ConversationCreateComponent
      },
      {
        path: "conversations/:id",
        component: ConversationDetailComponent,
        resolve: { user: ConversationDetailResolver }
      }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
