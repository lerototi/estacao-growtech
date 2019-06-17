import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { TempUmidadeArComponent } from './pages/temp-umidade-ar/temp-umidade-ar.component';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { TableModule } from 'primeng/table';
import { DropdownModule} from 'primeng/components/dropdown/dropdown';
import { ButtonModule } from 'primeng/components/button/button';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TempUmidadeArComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FieldsetModule,
    TableModule,
    DropdownModule,
    ButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
