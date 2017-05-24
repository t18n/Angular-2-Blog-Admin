import { Component, OnInit, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { ArticleService } from './../article/article.service';
import { ADDARTICLEDATA } from './../article/addarticledata';
import { CategoryService } from './../article/category.service';

declare var tinymce: any;

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css'],
  providers: [ArticleService, CategoryService]
})


export class AddarticleComponent implements OnInit {

  
  editor;
  public message: string;
  public categories: any;
  public articleData: ADDARTICLEDATA = new ADDARTICLEDATA();
  public error: string;
  public elementId: string = "tinymce";
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();

  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: './../../../node_modules/tinymce/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.articleData.content = content;
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  addArticle() {
    console.log(localStorage.getItem('authadminToken'));
    console.log(this.articleData.content);
    this.articleService.addArticle(this.articleData).subscribe(
      data => {
        this.articleData = data;
        this.message = this.articleData.title;
      }
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data,
      error => this.error = error.json().error
    );
  }

}
