import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http: HttpClient) { }
  rootURL = '/api';

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.rootURL +"/books");
  }
  getBook(id:number): Observable<Book> {
    return this.http.get<Book>(this.rootURL +`/books/${id}`)
  }
  saveBook(book: Book): Observable<any> {
    return this.http.post(this.rootURL +'/books', book)
  }
  editBook(book: Book): Observable<any> {
    return this.http.put(this.rootURL +`/books/${book.id}`, book)
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(this.rootURL +`/books/${id}`)
  }
}
