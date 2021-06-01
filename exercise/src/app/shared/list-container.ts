import { OnInit, ChangeDetectorRef, Optional } from '@angular/core'
import { Params, Router, ActivatedRoute } from '@angular/router'
import { Subject, Observable, merge } from 'rxjs'

import { isUndefined, omitBy } from 'lodash-es'
import { tap, switchMap, finalize, take } from 'rxjs/operators'
import { QueryResult } from '../types/model'


export abstract class ListContainer<T> implements OnInit {
  isLoading: boolean = false
  total: number = 0
  page = 1
  sort: string = ''
  query: string = ''
  params: { [key: string]: any } = {}
  items: T[] = []

  get totalPages(): number {
    return Math.ceil(this.total / this.quantity)
  }

  get currentParams() {
    return this.useRoute ? this.route.snapshot.params : {}
  }

  protected refreshTrigger = new Subject()

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    public quantity: number = 10,
    protected useRoute: boolean = true,
    @Optional() protected cdr: ChangeDetectorRef = null
  ) {
  }

  ngOnInit() {
    this.subscribe()
  }

  onPageChanged(pageNumber: string) {
    this.navigate({ ...this.currentParams, page: pageNumber })
  }

  onQuantityChanged(quantity: number) {
    this.navigate({ ...this.currentParams, page: 1, quantity: quantity })
  }

  onQueryChanged(query: string) {
    this.navigate({ ...this.currentParams, page: 1, query: query })
  }

  onSorted(sort: string) {
    this.navigate({ ...this.currentParams, page: 1, sort: sort })
  }

  refresh() {
    this.refreshTrigger.next(this.route.snapshot.params)
  }

  protected abstract fetch(): Observable<QueryResult<T>>

  protected getSort() {
    return this.sort
  }

  protected subscribe() {
    const next = result => {
      this.isLoading = false
      this.handleResult(result)
    }

    const error = reason => {
      this.isLoading = false
      this.handleError(reason)
    }

    if (this.useRoute) {
      merge(this.refreshTrigger, this.route.params).pipe(
        tap(this.readRouteParams.bind(this)),
        switchMap(() => {
          this.isLoading = true
          return this.fetch().pipe(finalize(() => {
            if (this.cdr) {
              this.cdr.detectChanges()
            }
          }))
        })
      ).subscribe(next, error)
    } else {
      this.refreshTrigger.pipe(
        switchMap(() => {
          this.isLoading = true
          return this.fetch().pipe(finalize(() => {
            if (this.cdr) {
              this.cdr.detectChanges()
            }
          }))
        })
      ).subscribe(next, error)
    }
  }

  protected readRouteParams(params: { [key: string]: any }) {
    const { page, quantity, sort, query } = params
    this.page = +page || 1
    this.quantity = +quantity || this.quantity
    this.sort = sort
    this.query = query
    const parsedParams = {}
    // tslint:disable-next-line:forin
    for (const key in params) {
      try {
        parsedParams[key] = JSON.parse(params[key])
      } catch (e) {
        parsedParams[key] = params[key]
      }
    }
    this.params = parsedParams
  }

  protected navigate(params: Params) {
    if (this.useRoute) {
      params = omitBy(Object.assign({}, params), isUndefined)
      this.router.navigate([params], { relativeTo: this.route })
    } else {
      this.mergeParams(params)
      this.refreshTrigger.next()
    }
  }

  protected mergeParams(params: Params) {
    this.page = params.page || 1
    this.quantity = params.quantity || this.quantity
    this.params = Object.assign({}, this.params, params)
  }

  protected handleResult(result: QueryResult<T>) {
    this.total = result.count
    this.items = result.items
  }

  protected abstract handleError(reason: any)

  detechChange() {
    if (this.cdr) {
      this.cdr.detectChanges()
    }
  }
}
