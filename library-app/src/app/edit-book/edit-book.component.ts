import { Component, OnInit } from '@angular/core';

import { DataService} from '../data.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Book } from '../book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

    book!: Book;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      let id = params['id']

      this.dataService.getBook(id).subscribe(book => {
        this.book = book
      })
    })
  }

  updateBook() {
    this.dataService.editBook(this.book).subscribe(_ => {
      this.router.navigate(['/'])
    })
  }

  cancelUpdate(){
    this.router.navigate(['/']);
  }

}


