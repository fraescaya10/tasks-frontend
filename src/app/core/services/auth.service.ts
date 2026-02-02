import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Auth, signInWithCustomToken, signOut } from "@angular/fire/auth";
import { firstValueFrom } from "rxjs";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private auth: Auth = inject(Auth);
    private http: HttpClient = inject(HttpClient);

    async loginWithEmail(email: string): Promise<any> {
        const credentials = await firstValueFrom(
            this.http.post<{ authToken: string, created: boolean }>(`${environment.apiUrl}/auth/login`, { email })
        );
        const userCredentials = await signInWithCustomToken(this.auth, credentials.authToken);
        return { created: credentials.created, ...userCredentials };
    }

    async logout() {
        return signOut(this.auth);
    }
}
