import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategoryListComponent } from './transaction-category-list.component';

describe('TransactionCategoryListComponent', () => {
  let component: TransactionCategoryListComponent;
  let fixture: ComponentFixture<TransactionCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
