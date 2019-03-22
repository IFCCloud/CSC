import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes.config'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { ItemComponent } from './component/item/item.component';
import { LoaderComponent } from './common/loader/loader.component';
import { AlertComponent } from './common/alert/alert.component';

import { LoaderService } from './service/loader.service';
import { MessageService } from './service/message.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ItemComponent,
    LoaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [LoaderService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
