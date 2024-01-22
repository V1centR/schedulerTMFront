import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from "primeng/api"; 
import { Transactions } from '../model/transactions';

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
  itemsTest:any;
  transactionData:Transactions[] = [];

  constructor(private fb: FormBuilder,private messageService: MessageService) {} 

  ngOnInit() {

      this.registerMoney = this.fb.group({
      valueRegister: new FormControl('-',Validators.required),
      dateRegister: new FormControl('',Validators.required),
      fromAccount: new FormControl('',Validators.required),
      toAccount: new FormControl('',Validators.required),
      
    });

   

    for(let i = 1; i < 10;i++){

      const fromAccount = this.generateRandomName();
      const toAccount = this.generateRandomName();
      const randomMoney = this.generateRandomMoney();

      let transActionItem = new Transactions;

      transActionItem.id = i;
      transActionItem.dataRegistro ="22/01/2024";
      transActionItem.dataTransferencia = "29/01/2024";
      transActionItem.ctaOrigem = fromAccount;
      transActionItem.ctaDestino = toAccount;
      transActionItem.valorTransferencia = randomMoney;
      transActionItem.taxaAplicavel = "0%";
      transActionItem.status = "AP";

      this.transactionData.push(transActionItem);
    }

  
    
  }


  generateRandomName(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomName = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomName += alphabet.charAt(randomIndex);
    }
  
    return randomName;
  }

  generateRandomMoney(): string {
    const min = 9.99;
    const max = 9999.99;
    const randomValue = Math.random() * (max - min) + min;
    const roundedValue = Math.round(randomValue * 100) / 100;
    const formattedValue = roundedValue.toFixed(2);
    return formattedValue;
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
