import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from "primeng/api";
import { AgendamentoService } from '../service/agendamento-service';
import { Agendamento } from '../model/Agendamento';
import { differenceInDays, parse } from 'date-fns';

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
  blockTransaction:boolean = false;
  taxRateDisplay:string;
  taxRateApply:number = 0;
  dataOK:boolean = false;

  insertStatements:String[] = [];

  constructor(private fb: FormBuilder,private messageService: MessageService,private agendamentoService: AgendamentoService) {} 

  ngOnInit() {

      this.registerMoney = this.fb.group({
      valorTransferencia: new FormControl('',Validators.required),
      dateTransfer: new FormControl('',Validators.required),
      ctaOrigem: new FormControl('',Validators.required),
      ctaDestino: new FormControl('',Validators.required),
      
    });

    this.getAgendamentos();
  }

  calcDateTaxRate(dataString1: string, dataString2: string):number{

     const data1 = parse(dataString1, 'dd-MM-yyyy', new Date());
     const data2 = parse(dataString2, 'dd-MM-yyyy', new Date());
   
     // Calcular a diferença de dias entre as duas datas
     const diferencaDias = differenceInDays(data2, data1);
   
     return diferencaDias;

  }

  getAgendamentos(){
    this.agendamentoService.getToday().subscribe(data => {
      data.forEach(item => {
        this.transactionData.push(item);
        this.dataOK = true;
      });
    });
  }


  async onSubmit(){

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    this.registerMoney.disable();
    this.spinnerProccess = true;
    this.messages = [];

    //CALC DATES##############   
    this.applyTaxRate();

    if(!this.blockTransaction){

      let valorTransferencia:number = this.registerMoney.value.valorTransferencia;
      let sumTaxRateTransfer:number = valorTransferencia + (valorTransferencia*this.taxRateApply)/100;
      let dataItem = new Agendamento();

      dataItem.ctaOrigem = this.registerMoney.value.ctaOrigem.toUpperCase();
      dataItem.ctaDestino = this.registerMoney.value.ctaDestino.toUpperCase();
      dataItem.valorTransferencia = sumTaxRateTransfer.toString();
      dataItem.dataTransferencia = this.formatDate(this.registerMoney.value.dateTransfer);
      dataItem.taxaAplicavel = this.taxRateApply.toString();
      dataItem.status = "AP";

     await this.agendamentoService.postAgendamento(dataItem).subscribe({next: (data) => {
       
        sleep(2000);
        this.registerMoney.enable();
        this.registerMoney.reset();
        this.spinnerProccess = false;
        this.transactionData = [];
        this.taxRateApply = 0;
        this.getAgendamentos();
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Transferência agendada com sucesso.' });

        this.dataOK = true;
    
      },error: (e) => {
        this.dataOK = false;
        this.messages = [{ severity: 'error', summary: 'ERRO', detail: 'Um erro de processamento ocorreu, tente novamente: ' + e.message }];
      }});

    } else {

      this.dataOK = false;
      this.spinnerProccess = false;
      this.registerMoney.enable();
      this.messages = [{ severity: 'warn', summary: 'ATENÇÃO!', detail: 'Não é possível agendas com mais de 50 dias'}];

    }

  }

  applyTaxRate(){

    let dateNow = this.formatDate(new Date());
    let dateTransfer = this.formatDate(new Date(this.registerMoney.value.dateTransfer));
    const diferencaDias = this.calcDateTaxRate(dateNow, dateTransfer);

    diferencaDias == 0 ? this.taxRateApply = 2.5 : null;
    diferencaDias >= 1 && diferencaDias <= 10 ? this.taxRateApply = 0.0 : null;
    diferencaDias >= 11 && diferencaDias <= 20 ? this.taxRateApply = 8.2 : null;
    diferencaDias >= 21 && diferencaDias <= 30 ? this.taxRateApply = 6.9 : null;
    diferencaDias >= 31 && diferencaDias <= 40 ? this.taxRateApply = 4.7 : null;
    diferencaDias >= 41 && diferencaDias <= 50 ? this.taxRateApply = 1.7 : null;
    diferencaDias > 50 ? this.blockTransaction = true : this.blockTransaction = false;

    return this.taxRateApply;
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
    .join('-'));
}

}

