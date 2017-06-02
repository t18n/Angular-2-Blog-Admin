import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CategoryService {
  constructor(private http: Http) { }
  /**
   * Gets the list of all articles
   */
  public getCategories() {
    return this.http.get('http://api.sowable.com/categories')
      .map(res => res.json().data);
  }

  public deleteCategory(type, id) {
    return this.http.delete('http://api.sowable.com/categories/'+ id)
      .map(res => res.json().data);
  }

  public editCategory(type, id) {
    return this.http.get('http://api.sowable.com/categories')
      .map(res => res.json().data);
  }
}