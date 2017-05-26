import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from './../HttpClient'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) { }

    /**
     * Gets the list of all articles
     */
    public getArticles() {
        return this.http.get('http://api.sowable.com/posts')
            .map(res => res.json().data);
    }

    public getArticle(id) {
        return this.http.get('http://api.sowable.com/posts/' + id)
            .map(res => res.json().data);
    }

    // Post new article
    public addArticle(articleData) {
        return this.http.post('http://api.sowable.com/posts', articleData)
            .map(res => res.json().data);
    }

    public updateArticle(id, articleData) {
        return this.http.patch('http://api.sowable.com/posts/' + id, articleData)
            .map(res => res.json().data);
    }

    public deleteArticle(id){
        return this.http.delete('http://api.sowable.com/posts/' + id)
            .map(res => res.json());
    }
}