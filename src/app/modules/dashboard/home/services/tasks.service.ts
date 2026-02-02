import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    private http: HttpClient = inject(HttpClient);

    getTasks() {
        return this.http.get(`${environment.apiUrl}/tasks`);
    }
}
