import { Component, inject } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { Router } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [
        MatToolbar,
        MatIcon
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss"
})
export class HomeComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    async logout() {
        await this.authService.logout();
        await this.router.navigate(["/login"]);
    }
}
