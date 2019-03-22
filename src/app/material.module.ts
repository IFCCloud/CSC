import { NgModule } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,MatRippleModule} from '@angular/material/core';

import {  MatListModule, MatToolbarModule, MatButtonModule, MatCardModule , MatIconModule,
    MatFormFieldModule, MatInputModule, MatStepperModule, MatSelectModule, MatDatepickerModule,
    MatGridListModule,MatChipsModule, MatTabsModule, MatRadioModule, MatSnackBarModule } from '@angular/material';

import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
//import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';


export const CSC_DATE_FORMAT = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'LL',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

@NgModule({
    imports: [
      MatButtonModule,MatIconModule,MatListModule,MatToolbarModule,MatCardModule,MatFormFieldModule,MatInputModule,
      MatStepperModule,MatSelectModule,MatDatepickerModule, MatGridListModule,MatRippleModule,MatTableModule,MatExpansionModule,
      MatChipsModule,MatTabsModule,MatRadioModule, MatSnackBarModule
    ],
     exports: [
      MatButtonModule, MatIconModule, MatListModule,MatToolbarModule,MatCardModule,MatFormFieldModule,MatInputModule,
      MatStepperModule, MatSelectModule, MatDatepickerModule,MatGridListModule, MatRippleModule,MatTableModule,MatExpansionModule,
      MatChipsModule, MatTabsModule, MatRadioModule, MatSnackBarModule
     ]/*,
    providers : [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
                {provide: MAT_DATE_FORMATS, useValue: CSC_DATE_FORMAT}] */
})


export class MaterialModule { }