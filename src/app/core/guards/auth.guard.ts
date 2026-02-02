import { inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = () => {
    const auth: Auth = inject(Auth);
    const router: Router = inject(Router);

    return user(auth).pipe(
        take(1),
        map((usr) => {
            if (usr) return true;
            router.navigate(["/login"]);
            return false;
        }),
    );
};
