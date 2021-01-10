import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../shared/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.URL}/api/items`);
  }

  getItem(): void {

  }

  checkIdExists(): void {

  }

  createItem(): void {

  }

  updateItem(): void {

  }

  deleteItem(): void {

  }

  deleteAllItems(): void {

  }

  createAllItems(): void {

  }

}
