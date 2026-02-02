import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";

@Component({
    selector: "app-confirm-dialog",
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: "./confirm-dialog.component.html",
    styleUrl: "./confirm-dialog.component.scss"
})
export class ConfirmDialogComponent {
    defaultMessage = "Are you sure you want to proceed?";
    customMessage: string | undefined;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        if (data.customMessage) {
            this.customMessage = data.customMessage;
        }
    }
}
