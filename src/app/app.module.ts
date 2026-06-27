import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './shared/header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';
import { currencyPipe } from './shared/pipes/CurrencyPipe.pipe';
import { NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { upperCasePipe } from './shared/pipes/UpperCasePipe.pipe';
import { FooterLayoutComponent } from './shared/footer-layout/footer-layout.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HeaderLayoutComponent, 
    FooterLayoutComponent,
    FormsModule, 
    currencyPipe, 
    upperCasePipe, 
    NgFor, 
    NgClass, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
