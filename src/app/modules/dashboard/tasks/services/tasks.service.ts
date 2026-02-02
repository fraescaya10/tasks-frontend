import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../../../../environments/environment";
import { Task, TaskRequest } from "../models/task.model";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    private http: HttpClient = inject(HttpClient);

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
    }

    createTask(task: TaskRequest) {
        return this.http.post<Task>(`${environment.apiUrl}/tasks`, task);
    }

    updateTask(task: TaskRequest, taskId: string) {
        return this.http.put(`${environment.apiUrl}/tasks/${taskId}`, task);
    }

    deleteTask(taskId: string) {
        return this.http.delete(`${environment.apiUrl}/tasks/${taskId}`);
    }
}
