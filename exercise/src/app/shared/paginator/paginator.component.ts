import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { range } from 'lodash-es';



@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() numberOfVisiblePages = 3
  @Input() page!: number
  @Input() quantity!: number
  @Input() total!: number
  @Output() changed = new EventEmitter()

  get totalPages(): number {
    return Math.ceil(this.total / this.quantity)
  }

  get hasNext() {
    return this.page && this.page < this.totalPages
  }

  get hasPrev() {
    return this.page && this.page > 1
  }

  displayPages!: Array<number>;

  constructor() { }

  ngOnInit() {
    this.prepareDisplayPages()
  }

  ngOnChanges() {
    this.prepareDisplayPages()
  }

  goTo(pageNumber: number) {
    this.changed.emit(pageNumber)
  }

  prev() {
    if (this.hasPrev) {
      this.goTo(this.page - 1)
    }
  }

  next() {
    if (this.hasNext) {
      this.goTo(this.page + 1)
    }
  }

  private prepareDisplayPages() {
    const distance = Math.floor(this.numberOfVisiblePages / 2) + 1
    const start = Math.max(this.page - distance + 1, 1)
    const end = Math.min(start + this.numberOfVisiblePages - 1, this.totalPages)
    let displayPages = range(start, end + 1)
    if (!displayPages.length) {
      displayPages = [1]
    }
    this.displayPages = displayPages
  }

}
