import { Component, OnInit } from '@angular/core';
import {AccordionModule} from "ng2-accordion";

declare var $;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
          
        $("#accordion").accordion();

      
  }

}
