import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
    MatCard, MatCardContent, MatCardHeader, MatCardTitle
} from "@angular/material/card";
import {
    MatError, MatFormField, MatInput, MatLabel
} from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        MatCard,
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatCardHeader,
        MatCardContent,
        MatCardTitle,
        MatError
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss"
})
export class LoginComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);
    private snackBar: MatSnackBar = inject(MatSnackBar);

    loginForm = {
        email: ""
    };

    async onSubmitForm() {
        if (this.loginForm.email) {
            try {
                const { created } = await this.authService.loginWithEmail(this.loginForm.email);
                const message = created ? "User created!" : "Login successfully!";
                this.snackBar.open(message, undefined, {
                    duration: 3000
                });
                await this.router.navigate(["/home"]);
            } catch (e) {
                this.snackBar.open("Error logging in. Please check your email..", undefined, {
                    duration: 3000
                });
            }
        }
    }
}
