import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from "primeng/api"; 
import { delay } from 'rxjs';

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
  valueRegister:any;
  registerMoney: FormGroup;
  isDisabled:boolean = false;
  spinnerProccess:boolean = false;
  dateMessage:string;
  dateMessageShowHide:boolean = false;



  constructor(private fb: FormBuilder,private messageService: MessageService) {} 

  ngOnInit() {

    //let customPatterns = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };

    this.registerMoney = this.fb.group({
      valueRegister: new FormControl('-',Validators.required),
      dateRegister: new FormControl('',Validators.required),
      fromAccount: new FormControl('',Validators.required),
      toAccount: new FormControl('',Validators.required),
      
    });


    this.dateMessage = "Selecione uma data.";
    
  }

  async onSubmit(){

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    console.log("SUBMIT EXEC");
    console.log(this.registerMoney);

    console.log("VALUE::: " + this.registerMoney.value.valueRegister);

    if(this.registerMoney.value.dateRegister == ''){
      this.dateMessageShowHide = true 
    }

    this.registerMoney.disable();
    this.spinnerProccess = true;

    await sleep(2000);

    this.registerMoney.enable();
    this.registerMoney.reset();
    this.spinnerProccess = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transferência agendada com sucesso.' });


  }


  checkInputCurrency(event:any){

    let valueInput = event.target.value;

    if(valueInput =='' || valueInput == undefined || valueInput == "R$ 0,00"){
      this.registerMoney.controls["valueRegister"].setErrors({'incorrect': true});
    }
  }

  

}
function sleep(arg0: number) {
  throw new Error('Function not implemented.');
}

