import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../article/article.service';
import { ADDARTICLEDATA } from './../article/addarticledata';
import { CategoryService } from './../article/category.service';
declare var $: any;

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css'],
  providers:[ArticleService, CategoryService]
})


export class AddarticleComponent implements OnInit {

  public categories: any;
  public articleData: ADDARTICLEDATA = new ADDARTICLEDATA();
  public error:string;
  constructor(
    private articleService : ArticleService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();

  }

  // ngAfterViewChecked() {
  //   $(function () {
  //     $('div#froala-editor').froalaEditor({
  //       toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'specialCharacters', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'quote', 'insertHR', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html', 'applyFormat', 'removeFormat', 'fullscreen', 'print', 'help'],
  //       pluginsEnabled: null
  //     })
  //   });
  // }

  addArticle(){
    console.log(localStorage.getItem('authadminToken'));
    this.articleService.addArticle(this.articleData).subscribe(
      error => this.error = error.json().error
    );
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      data => this.categories = data,
      error => this.error = error.json().error
    );
  }

}
