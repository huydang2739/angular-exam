import { Component, OnInit, Input, HostBinding } from '@angular/core'
import { SafeStyle, DomSanitizer } from '@angular/platform-browser'


@Component({
  selector: '[loader]',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input('loader') loading: boolean
  @Input() type: string
  @Input() height = 300
  @Input() primaryColor = '#d0d5dc'
  @Input() secondaryColor = '#e5e9f1'
  @Input() speed = 2
  @Input() row = 1
  @Input() column = 1
  @Input() itemHeight = 120

  placeholders = []


  @HostBinding('style')
  get style(): SafeStyle {
    if (this.loading) {
      return this.sanitizer.bypassSecurityTrustStyle(`min-height: ${this.height}px; position: relative;`)
    }
    return this.sanitizer.bypassSecurityTrustStyle('min-height: 0; position: relative;')
  }

  pX(valuePercent: number, iColumn: number): string {
    return `calc(100%/${this.column} * ${iColumn} + ${valuePercent / this.column}%)`
  }

  pY(value: number, iRow: number): string {
    return `${this.itemHeight * iRow + value}`
  }

  sW(valuePercent: number): string {
    return `calc(${valuePercent}%/${this.column})`
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
}
