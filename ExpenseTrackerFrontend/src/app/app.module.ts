import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AccumulationChartModule, ChartModule } from '@syncfusion/ej2-angular-charts';

import { AppComponent } from './app.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddEditTransactionComponent } from './transaction/add-edit-transaction/add-edit-transaction.component';
import { AddEditTypeComponent } from './transaction/add-edit-type/add-edit-type.component';
import { AddEditCategoryComponent } from './transaction/add-edit-category/add-edit-category.component';
import { TransactionTypeListComponent } from './transaction/transaction-type-list/transaction-type-list.component';
import { TransactionCategoryListComponent } from './transaction/transaction-category-list/transaction-category-list.component';
import { TransactionTableComponent } from './transaction/transaction-table/transaction-table.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DoughnutComponent } from './charts/doughnut/doughnut.component';
import { SplineComponent } from './charts/spline/spline.component';

import { TransactionDataService } from './transaction-data.service';
import { PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import { SplineSeriesService, DataLabelService, LegendService, TooltipService, CategoryService } from '@syncfusion/ej2-angular-charts';
const routes: Routes = [
  { path: 'transactionTable', component: TransactionTableComponent },
  { path: 'transactionTypes', component: TransactionTypeListComponent},
  { path: 'transactionCategories', component: TransactionCategoryListComponent},
  // TODO: Create a default "dashboard" component, remove transaction component from the below route
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    AddEditTransactionComponent,
    AddEditTypeComponent,
    AddEditCategoryComponent,
    TransactionTypeListComponent,
    TransactionCategoryListComponent,
    TransactionTableComponent,
    DashboardComponent,
    DoughnutComponent,
    SplineComponent
  ],
  imports: [
    BrowserModule,
    AccumulationChartModule,
    ChartModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TransactionDataService, 
    CurrencyPipe, 
    AccumulationLegendService, LegendService,
    AccumulationTooltipService, TooltipService, 
    AccumulationDataLabelService, DataLabelService, 
    AccumulationAnnotationService, CategoryService,
    PieSeriesService, SplineSeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
