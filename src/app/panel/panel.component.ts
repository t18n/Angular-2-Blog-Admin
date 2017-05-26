import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../article/article.service';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers: [ArticleService]
})
export class PanelComponent implements OnInit {

  public message: string;
  public articles: any;
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe(
      data => this.articles = data
    );
  }

  deleteArticle(id, title) {
    if (confirm("Are you sure that you want to delete '" + title + "' article?")) {
      this.articleService.deleteArticle(id).subscribe(
        data => {
          this.getArticles();
        }
      );
    }
  }

}
