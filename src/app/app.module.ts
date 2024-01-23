import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

//PrimeNG components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message";
import { NgxCurrencyDirective } from "ngx-currency";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TransactionsComponent } from './transactions/transactions.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';



registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TabMenuModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    NgxCurrencyDirective,
    ReactiveFormsModule,
    NgxMaskDirective, NgxMaskPipe,
    ProgressSpinnerModule,
    ToastModule,
    TableModule,
    TagModule,
    HttpClientModule
    
    
    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
