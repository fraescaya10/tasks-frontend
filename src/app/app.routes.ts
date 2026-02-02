import { Routes } from "@angular/router";

import { authGuard } from "./core/guards/auth.guard";
import { publicGuard } from "./core/guards/public.guard";
import { LoginComponent } from "./modules/auth/login/login.component";

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [publicGuard]
    },
    {
        path: "home",
        loadComponent: () => import("./modules/dashboard/home/home.component").then((m) => m.HomeComponent),
        canActivate: [authGuard]
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    }
];
