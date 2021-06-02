import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() search: string = '';
  @Input() placeholder: string = ''
  @Output() changed = new EventEmitter()

  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.update()
    }
    if (event.keyCode === 27) {
      this.clear()
    }
  }

  clear() {
    this.search = ''
    this.update()
  }

  private update() {
    this.changed.emit(this.search)
  }
}
