import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient} from './../HttpClient'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) { }

    //   public getArticles() {
    //    return this.http.get('posts')
    //       .map(res => res.json().data);
    //   }

    // Post new article
    public addArticle(articleData) {
        console.log(articleData);
        return this.http.post('http://api.sowable.com/posts', articleData)
            .map(res => res.json());
    }
}