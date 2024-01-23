import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Agendamento } from "../model/Agendamento";

@Injectable({
    providedIn: 'root'
  })
export class AgendamentoService {

    LC_API:string = "http://localhost:8080/agendamento";

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get<Agendamento[]>(`${this.LC_API}/all`);
    }


}
