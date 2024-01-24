import { Component } from '@angular/core';
import { Agendamento } from '../model/Agendamento';
import { AgendamentoService } from '../service/agendamento-service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  startDate = new Date();
  endDate= new Date();
  spinnerProccess:boolean = false;
  messages: Message[] | undefined;
  dataOK:boolean = false;

  transactionData:Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) {} 

  ngOnInit() {

    this.getAgendamentos();
    
  }

  submitSerach(){    

    this.spinnerProccess = true;
    this.messages = [];

    if(this.startDate == undefined || this.endDate == undefined ){
      this.transactionData = [];
      this.getAgendamentos();
      this.spinnerProccess = false;
    } else {

      let startDate = this.formatDate(this.startDate);
      let endDate = this.formatDate(this.endDate);
      this.transactionData = [];

    this.agendamentoService.getByDateRange(startDate,endDate).subscribe({next: (data) => {
        
      this.behaviorMessages(data);
      
      },error: (e) => {
        this.messages = [{ severity: 'error', summary: 'ERRO', detail: 'Um erro de processamento ocorreu, tente novamente: ' + e.message }];

      }});
    }

    this.spinnerProccess = false;
  
  }

  getAgendamentos(){
    this.agendamentoService.getToday().subscribe({next: data => {

     this.behaviorMessages(data);
      
    }, error: (e) => {
      this.dataOK = false;
      this.messages = [{ severity: 'error', summary: 'ERRO', detail: 'Um erro de processamento ocorreu, tente novamente: ' + e.message }];       
    }});
}

behaviorMessages(data:Agendamento[]){

  if(data.length == 0){
    this.dataOK = false;
    this.messages = [{ severity: 'info', summary: 'INFO', detail: 'Não há lançamentos para esta data' }]; 
  } else {
    data.forEach(item => {
      this.transactionData.push(item);
    });

    this.messages = [];
    this.dataOK = true;
  }

}

//TODO Move to ultils module
padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}
  
  
//TODO Move to ultils module
formatDate(date: Date) {
  return (
    [
    this.padTo2Digits(date.getDate()),
    this.padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
    ]
    .join('-'));
}

}
