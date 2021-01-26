import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogRole, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Categories } from 'src/app/models/categories';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Categories[] = [];

  constructor(private categorySevice: CategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategoriesFromApi();
  }

  getCategoriesFromApi() {
    this.categorySevice.getCategories().subscribe((res: Categories[]) => {
      this.categories = res;
    })
  }

  onSubmitcategory(category: NgForm) {
    this.categorySevice.createCategory(category.value).subscribe((res: Categories) => {
      console.log(res);
      this.categories.push(res)
    })
  }

  editName(categoryId) {
    this.dialog.open(editCategoryNameComponent, {
      data: {
        categoryId
      },
      autoFocus: true,
      height: 'auto',
      maxWidth: window.innerWidth < 750 ? '100%' : 'auto'
    }).afterClosed().subscribe(() => {
      this.getCategoriesFromApi();
    })
  }
}

@Component({
  selector: 'editCategoryName',
  templateUrl: 'editCategoryName.component.html',
  styleUrls: [
    './category.component.scss'
  ]
})
export class editCategoryNameComponent {


  constructor(public dialogRef: MatDialogRef<DialogRole>
    , @Inject(MAT_DIALOG_DATA) public categoryId, public dialog: MatDialog, private categorySevice: CategoryService) { }
  ngOnInit(): void {

  }
  onSubmitcategory(categoryForm: NgForm) {
    return this.categorySevice.editCategoryName(this.categoryId.categoryId, categoryForm.value.categoryName)
      .subscribe({ complete: () => this.dialogRef.close() })
  }
}