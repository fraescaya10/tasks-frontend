import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../../../../environments/environment";
import { Task } from "../models/task.model";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    private http: HttpClient = inject(HttpClient);

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
    }
}
