import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-info-help',
  templateUrl: './info-help.component.html',
  styleUrl: './info-help.component.css'
})
export class InfoHelpComponent {

  messages: Message[] | undefined;
  
  constructor() {}

  ngOnInit() {
    
    this.messages = [{ severity: 'info', summary: 'INFO', detail: 'Support: vicentcdb@gmail.com ' }];
  }



}
