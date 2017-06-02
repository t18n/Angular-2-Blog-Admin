import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AccordionModule } from "ng2-accordion";
import { CategoryService } from './../article/category.service';
declare var $;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {

  public categories: any;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();


  }

  accordion() {
    $("#accordion").accordion();

  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        if (data != null) {
          setTimeout(this.accordion, 2000);
        }
      }

    );
  }

  delete(type, id){
    this.categoryService.deleteCategory(type, id).subscribe(
      data => this.categories = data
    );
  }

  addCatagory(){

  }

  edit(){
    
  }

}
