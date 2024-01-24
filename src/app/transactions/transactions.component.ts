import { Component, Input } from '@angular/core';
import { Agendamento } from '../model/Agendamento';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

  @Input() data: Agendamento[] = [];

  ngOnInit() {
  }

}
