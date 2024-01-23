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

  insertStatements:String[] = [];

  constructor(private fb: FormBuilder,private messageService: MessageService,private agendamentoService: AgendamentoService) {} 

  ngOnInit() {

      this.registerMoney = this.fb.group({
      valueRegister: new FormControl('-',Validators.required),
      dateRegister: new FormControl('',Validators.required),
      fromAccount: new FormControl('',Validators.required),
      toAccount: new FormControl('',Validators.required),
      
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
    console.log("SUBMIT EXEC");
    console.log(this.registerMoney);

    console.log("VALUE::: " + this.registerMoney.value.valueRegister);

    this.registerMoney.disable();
    this.spinnerProccess = true;

    await sleep(2000);

    this.registerMoney.enable();
    this.registerMoney.reset();
    this.spinnerProccess = false;
    this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Transferência agendada com sucesso.' });

  }

  checkInputCurrency(event:any){

    let valueInput = event.target.value;

    if(valueInput =='' || valueInput == undefined || valueInput == "R$ 0,00"){
      this.registerMoney.controls["valueRegister"].setErrors({'incorrect': true});
    }
  }

}
