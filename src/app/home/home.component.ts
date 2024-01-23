import { Component } from '@angular/core';
import { Agendamento } from '../model/Agendamento';
import { AgendamentoService } from '../service/agendamento-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  startDate: Date[] | undefined;
  endDate: Date[] | undefined;

  transactionData:Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) {} 

  ngOnInit() {

    this.getAgendamentos();
    
  }

  getAgendamentos(){
    this.agendamentoService.getAll().subscribe(data => {
      data.forEach(item => {
        this.transactionData.push(item);
      });
    });
  }

}
