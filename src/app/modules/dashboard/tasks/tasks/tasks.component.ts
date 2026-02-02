import { DatePipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from "@angular/material/icon";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import { Router } from "@angular/router";

import { AuthService } from "../../../../core/services/auth.service";
import { Task } from "../models/task.model";
import { TasksService } from "../services/tasks.service";

@Component({
    selector: "app-tasks",
    standalone: true,
    imports: [
        DatePipe,
        MatButton,
        MatCard,
        MatCell,
        MatCellDef,
        MatCheckbox,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatIconButton,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef
    ],
    templateUrl: "./tasks.component.html",
    styleUrl: "./tasks.component.scss"
})
export class TasksComponent implements OnInit {
    private authService: AuthService = inject(AuthService);
    private taskService: TasksService = inject(TasksService);
    private router: Router = inject(Router);

    displayedColumns: string[] = ["title", "description", "createdAt", "completed", "actions"];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    async logout() {
        await this.authService.logout();
        await this.router.navigate(["/login"]);
    }

    ngOnInit() {
        this.getTasks();
    }

    updateCompleted(task: Task) {
        task.completed = !task.completed;
    }

    getTasks() {
        this.taskService.getTasks().subscribe({
            next: (data: Task[]) => {
                this.dataSource.data = data;
            },
            error: (error) => console.log(error),
        });
    }

    addNewTask() {

    }

    editTask(task: Task) {

    }

    deleteTask(task:Task) {

    }
}
