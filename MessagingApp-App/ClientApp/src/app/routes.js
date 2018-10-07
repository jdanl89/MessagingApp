"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_guard_1 = require("./_guards/auth.guard");
var home_component_1 = require("./home/home.component");
var conversation_create_component_1 = require("./conversations/conversation-create/conversation-create.component");
var conversation_detail_component_1 = require("./conversations/conversation-detail/conversation-detail.component");
var user_create_component_1 = require("./users/user-create/user-create.component");
var user_edit_component_1 = require("./users/user-edit/user-edit.component");
var conversation_detail_resolver_1 = require("./_resolvers/conversation/conversation-detail.resolver");
var user_edit_resolver_1 = require("./_resolvers/user/user-edit.resolver");
exports.appRoutes = [
    { path: "home", component: home_component_1.HomeComponent },
    {
        path: "",
        component: home_component_1.HomeComponent,
        runGuardsAndResolvers: "always"
    },
    {
        path: "",
        runGuardsAndResolvers: "always",
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: "users/create",
                component: user_create_component_1.UserCreateComponent
            },
            {
                path: "users/:id/edit",
                component: user_edit_component_1.UserEditComponent,
                resolve: { user: user_edit_resolver_1.UserEditResolver }
            },
            {
                path: "conversations/create",
                component: conversation_create_component_1.ConversationCreateComponent
            },
            {
                path: "conversations/:id",
                component: conversation_detail_component_1.ConversationDetailComponent,
                resolve: { user: conversation_detail_resolver_1.ConversationDetailResolver }
            }
        ]
    },
    { path: "**", redirectTo: "home", pathMatch: "full" }
];
//# sourceMappingURL=routes.js.map