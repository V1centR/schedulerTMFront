import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from "primeng/api";
import { AgendamentoService } from '../service/agendamento-service';
import { Agendamento } from '../model/Agendamento';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent {

  date2: Date | undefined;
  valorCurrency:any;
  message:any;
  gfg: Message[];
  minimumDate = new Date();
  registerMoney: FormGroup;
  spinnerProccess:boolean = false;
  transactionData:Agendamento[] = [];
  messages: Message[] | undefined;

  insertStatements:String[] = [];

  constructor(private fb: FormBuilder,private messageService: MessageService,private agendamentoService: AgendamentoService) {} 

  ngOnInit() {

      this.registerMoney = this.fb.group({
      valorTransferencia: new FormControl('-',Validators.required),
      dateTransfer: new FormControl('',Validators.required),
      ctaOrigem: new FormControl('',Validators.required),
      ctaDestino: new FormControl('',Validators.required),
      
    });

    this.getAgendamentos();
  }



  getAgendamentos(){
    this.agendamentoService.getToday().subscribe(data => {
      data.forEach(item => {
        this.transactionData.push(item);
      });
    });
  }


  async onSubmit(){

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    this.registerMoney.disable();
    this.spinnerProccess = true;

    let dataItem = new Agendamento();

    dataItem.ctaOrigem = this.registerMoney.value.ctaOrigem.toUpperCase();
    dataItem.ctaDestino = this.registerMoney.value.ctaDestino.toUpperCase();
    dataItem.valorTransferencia = this.registerMoney.value.valorTransferencia;
    dataItem.dataTransferencia = this.formatDate(this.registerMoney.value.dateTransfer);
    dataItem.status = "AP";

    this.agendamentoService.postAgendamento(dataItem).subscribe({next: (data) => {
    
    },error: (e) => {
      console.log(e);
      this.messages = [{ severity: 'error', summary: 'ERRO', detail: 'Um erro de processamento ocorreu, tente novamente: ' + e.message }];
    }});

    await sleep(2000);

    this.registerMoney.enable();
    this.registerMoney.reset();
    this.spinnerProccess = false;
    this.transactionData = [];
    this.getAgendamentos();
    this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Transferência agendada com sucesso.' });

  }

  checkInputCurrency(event:any){

    let valueInput = event.target.value;

    if(valueInput =='' || valueInput == undefined || valueInput == "R$ 0,00"){
      this.registerMoney.controls["valueRegister"].setErrors({'incorrect': true});
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
