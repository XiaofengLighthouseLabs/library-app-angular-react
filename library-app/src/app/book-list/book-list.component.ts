import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private dataService: DataService) { }

  books:Book[] = []

  ngOnInit(): void {
    this.dataService.getBooks().subscribe(bookList => {
      this.books = bookList
    })
  }

  deleteBook(book: Book) {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return
    }

    this.dataService.deleteBook(book.id).subscribe(_ => {
        this.books = this.books.filter(b => b.id !== book.id)
    })
  }

}
