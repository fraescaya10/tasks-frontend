import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { authInterceptor } from "./core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => {
            const auth = getAuth();
            if (environment.useEmulators) {
                connectAuthEmulator(auth, "http://localhost:9099");
            }
            return auth;
        })]
};
