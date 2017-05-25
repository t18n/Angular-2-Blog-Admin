import { Component, OnInit, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { ArticleService } from './../article/article.service';
import { ADDARTICLEDATA } from './../article/addarticledata';
import { CategoryService } from './../article/category.service';
import { CustomFunctions } from './../custom/custom.functions';
import { ActivatedRoute, Router, Params } from '@angular/router';
declare var tinymce: any;

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css'],
  providers: [ArticleService, CategoryService, CustomFunctions]
})


export class AddarticleComponent implements OnInit {


  editor;
  public content_id: string;
  public message: string;
  public categories: any;
  public articleData: ADDARTICLEDATA = new ADDARTICLEDATA();
  public error: string;
  public elementId: string = "tinymce";
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private customFunctions: CustomFunctions,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.content_id = (params['todo'])
      console.log(this.content_id);
      if (this.content_id !== "add") {
        this.loadArticle(this.content_id);
      }
    });
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
    this.articleData.user_id = parseInt(localStorage.getItem('userID'));
    this.articleData.updated_at = this.customFunctions.transformDate(Date());
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

  loadArticle(id) {
    this.articleService.getArticle(id).subscribe(
      data => {
        this.articleData = data;
        tinymce.init({
          selector: '#' + this.elementId,
          setup: editor => {
            this.editor = editor;
              editor.setContent(this.articleData.content);
          },
        });
      }
    )
  }

}
