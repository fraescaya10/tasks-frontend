import { Component, inject, OnInit } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { Router } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";
import { TasksService } from "./services/tasks.service";

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
export class HomeComponent implements OnInit {
    private authService: AuthService = inject(AuthService);
    private taskService: TasksService = inject(TasksService);
    private router: Router = inject(Router);

    async logout() {
        await this.authService.logout();
        await this.router.navigate(["/login"]);
    }

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this.taskService.getTasks().subscribe({
            next: (data) => {
                console.log(data);
            },
            error: (error) => console.log(error),
        });
    }
}
