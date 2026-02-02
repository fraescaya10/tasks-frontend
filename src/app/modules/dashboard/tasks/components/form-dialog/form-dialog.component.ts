import { Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import {
    MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {
    MatError, MatFormField, MatInput, MatLabel
} from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";

import { TasksService } from "../../services/tasks.service";

@Component({
    selector: "app-form-dialog",
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        FormsModule,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
        MatDialogClose,
        MatCheckbox
    ],
    templateUrl: "./form-dialog.component.html",
    styleUrl: "./form-dialog.component.scss"
})
export class FormDialogComponent {
    private taskService: TasksService = inject(TasksService);
    private snackBar: MatSnackBar = inject(MatSnackBar);
    private dialogRef = inject(MatDialogRef<FormDialogComponent>);

    addEditTaskForm = {
        id: "",
        title: "",
        description: "",
        completed: false
    };
    isUpdate = false;
    loading = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        if (data && data.task) {
            this.addEditTaskForm = { ...data.task };
            this.isUpdate = true;
        }
    }

    onAddEditFormSubmit() {
        this.loading = true;
        if (this.isUpdate) {
            this.taskService.updateTask(this.addEditTaskForm, this.addEditTaskForm.id).subscribe({
                next: () => {
                    this.snackBar.open(`Task ${this.addEditTaskForm.title} updated successfully`, undefined, {
                        duration: 3000
                    });
                    this.loading = false;
                    this.dialogRef.close(true);
                },
                error: () => {
                    this.snackBar.open(`Error trying to update the task ${this.addEditTaskForm.title}`, undefined, {
                        duration: 3000
                    });
                }
            });
        } else {
            const newTask = {
                title: this.addEditTaskForm.title,
                description: this.addEditTaskForm.description,
                completed: this.addEditTaskForm.completed
            };
            this.taskService.createTask(newTask).subscribe({
                next: () => {
                    this.snackBar.open(`Task ${this.addEditTaskForm.title} created successfully`, undefined, {
                        duration: 3000
                    });
                    this.loading = false;
                    this.dialogRef.close(true);
                },
                error: () => {
                    this.snackBar.open(`Error trying to create the task ${this.addEditTaskForm.title}`, undefined, {
                        duration: 3000
                    });
                }
            });
        }
    }
}
