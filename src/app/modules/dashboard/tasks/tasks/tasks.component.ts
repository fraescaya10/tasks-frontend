import { DatePipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";

import { ConfirmDialogComponent } from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import { FormDialogComponent } from "../components/form-dialog/form-dialog.component";
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
    private taskService: TasksService = inject(TasksService);
    private dialog: MatDialog = inject(MatDialog);
    private snackBar: MatSnackBar = inject(MatSnackBar);

    displayedColumns: string[] = ["title", "description", "createdAt", "completed", "actions"];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    loading: boolean = false;

    ngOnInit() {
        this.getTasks();
    }

    updateCompleted(task: Task) {
        this.loading = true;
        const updatedTask = { ...task, completed: !task.completed };
        this.taskService.updateTask(updatedTask, task.id).subscribe({
            next: () => {
                this.loading = false;
                this.snackBar.open(`Task ${updatedTask.title} updated successfully`, undefined, {
                    duration: 3000
                });
                this.getTasks();
            },
            error: () => {
                this.loading = false;
                this.snackBar.open(`Error trying to update the task ${updatedTask.title}`, undefined, {
                    duration: 3000
                });
            }
        });
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
        const dialogRef = this.dialog.open(FormDialogComponent, { disableClose: true });
        dialogRef.afterClosed().subscribe((proceed: boolean) => {
            if (proceed) {
                this.getTasks();
            }
        });
    }

    editTask(task: Task) {
        const dialogRef = this.dialog.open(FormDialogComponent, { disableClose: true, data: { task } });
        dialogRef.afterClosed().subscribe((proceed: boolean) => {
            if (proceed) {
                this.getTasks();
            }
        });
    }

    deleteTask(task:Task) {
        const dialogRef = this.dialog.open(
            ConfirmDialogComponent,
            { data: { customMessage: `Are you sure you want to delete the task "${task.title}"?` } }
        );
        dialogRef.afterClosed().subscribe((proceed: boolean) => {
            if (proceed) {
                this.performDeleteTask(task);
            }
        });
    }

    performDeleteTask(task: Task) {
        this.loading = true;
        this.taskService.deleteTask(task.id).subscribe({
            next: () => {
                this.loading = false;
                this.getTasks();
            },
            error: () => {
                this.snackBar.open(`Error trying to delete the task ${task.title}`, undefined, {
                    duration: 3000
                });
            }
        });
    }
}
