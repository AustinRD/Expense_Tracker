import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddEditTransactionComponent } from './transaction/add-edit-transaction/add-edit-transaction.component';

import { TransactionDataService } from './transaction-data.service';
import { AddEditTypeComponent } from './transaction/add-edit-type/add-edit-type.component';
import { AddEditCategoryComponent } from './transaction/add-edit-category/add-edit-category.component';
import { TransactionTypeListComponent } from './transaction/transaction-type-list/transaction-type-list.component';
import { TransactionCategoryListComponent } from './transaction/transaction-category-list/transaction-category-list.component';
import { TransactionTableComponent } from './transaction/transaction-table/transaction-table.component';

const routes: Routes = [
  { path: 'transactionTable', component: TransactionTableComponent },
  { path: 'transactionTypes', component: TransactionTypeListComponent},
  { path: 'transactionCategories', component: TransactionCategoryListComponent}
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
    TransactionTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TransactionDataService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
