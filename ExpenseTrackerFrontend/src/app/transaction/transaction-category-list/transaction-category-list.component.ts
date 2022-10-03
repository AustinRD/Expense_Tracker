import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/transaction-category.model';
import { TransactionDataService } from 'src/app/transaction-data.service';


@Component({
  selector: 'app-transaction-category-list',
  templateUrl: './transaction-category-list.component.html',
  styleUrls: ['./transaction-category-list.component.css']
})
export class TransactionCategoryListComponent implements OnInit {
  transactionCategoriesList$!:Observable<Category[]>;

  transactionCategoriesList: Category[] = [];
  transactionCategoriesMap: Map<string, string[]> = new Map();
  categoryMap: Map<string, Category> = new Map();

  category: Category = {
    id: 0,
    category: '',
    subcategory: ''
  }
  modalTitle: string = "";

  constructor(public service: TransactionDataService) { }

  ngOnInit(): void {
    this.transactionCategoriesList$ = this.service.getTransactionCategoriesList();
    this.initializeTransactionCategoriesMap();
  }
  addModal(category?: string) {
    this.category = {
      id: 0,
      category: category ? category : '',
      subcategory: ''
    }
    this.modalTitle = "Add Category";
  }
  editModal(category: Category) {
    this.category = category;
    this.modalTitle = "Edit Category";
  }
  deleteModal(category: Category) {
    if(confirm('Are you sure you want to delete this category?')) {
      this.service.deleteTransactionCategories(category.id).subscribe(res => {
        this.transactionCategoriesList$ = this.service.getTransactionCategoriesList();
      });
      window.location.reload();
    }
  }
  closeModal() {
    this.transactionCategoriesList$ = this.service.getTransactionCategoriesList();
  }

  initializeTransactionCategoriesMap() {
    this.service.getTransactionCategoriesList().subscribe(data => {
      this.transactionCategoriesList = data;
      
      let category = "";
      let subcategory = "";
      let subcategory_array: string[] = [];

      for(let i = 0; i < data.length; i++) {
        category = this.transactionCategoriesList[i].category;
        subcategory = this.transactionCategoriesList[i].subcategory == null ? '' : this.transactionCategoriesList[i].subcategory == '' ? '' : this.transactionCategoriesList[i].subcategory!;

        if(this.transactionCategoriesMap.has(category)) {
          // Category already mapped
          subcategory_array = this.transactionCategoriesMap.get(category)!;
        }
        if(subcategory != '') {
          subcategory_array.push(subcategory);
        }

        this.transactionCategoriesMap.set(category, subcategory_array);
        this.categoryMap.set(category + subcategory, this.transactionCategoriesList[i]);
        subcategory_array = [];
      }
      this.transactionCategoriesMap.delete("");
    });
  }
}
