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

  transactionData:Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) {} 

  ngOnInit() {

    this.getAgendamentos();
    
  }

  submitSerach(){    

    this.spinnerProccess = true;

    if(this.startDate == undefined || this.endDate == undefined ){
      this.transactionData = [];
      this.getAgendamentos();
      this.spinnerProccess = false;
    } else {

      let startDate = this.formatDate(this.startDate);
      let endDate = this.formatDate(this.endDate);
      this.transactionData = [];

      this.agendamentoService.getByDateRange(startDate,endDate).subscribe({next: (data) => {
        
        data.forEach(item => {          
          this.transactionData.push(item);
        })
      
      },error: (e) => {
        console.log(e);
        this.messages = [{ severity: 'error', summary: 'ERRO', detail: 'Um erro de processamento ocorreu, tente novamente: ' + e.message }];

      }});
    }

    this.spinnerProccess = false;
  
  }

  getAgendamentos(){
    this.agendamentoService.getToday().subscribe({next: data => {
      data.forEach(item => {
        this.transactionData.push(item);
      })
    }, error: (e) => {
      console.log(e);
      this.messages = [{ severity: 'error', summary: 'ERRO', detail: 'Um erro de processamento ocorreu, tente novamente: ' + e.message }];       
    }});
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
    .join('-')
    
    /*+
    ' ' +
    [
    this.padTo2Digits(date.getHours()),
    this.padTo2Digits(date.getMinutes()),
    this.padTo2Digits(date.getSeconds()),
    ].join(':')*/
  );
}

}
