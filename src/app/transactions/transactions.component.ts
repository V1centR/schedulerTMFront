import { Component, Input } from '@angular/core';
import { Transactions } from '../model/transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

  @Input() data: Transactions[] = [];

  ngOnInit() {

    console.log("DATA INPUT ### ");
    console.log(this.data);

  }

}
