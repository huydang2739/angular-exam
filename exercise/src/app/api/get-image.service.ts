import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryResult, Image } from '../types/model';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {
  baseUrl = 'https://60ab7dc75a4de40017cca339.mockapi.io/api/'
  constructor(private httpClient: HttpClient) { }

  protected createParams(params: { [key: string]: any }): HttpParams {
    return Object.keys(params).reduce((m, k) => {
      if (params[k] != null) {
        return m.set(k, params[k].toString())
      }
      return m
    }, new HttpParams())
  }

  getAnimalImage(params: { skip: number, take: number, query: string }) {
    return this.httpClient.get<QueryResult<Image>>(`${this.baseUrl}/dog`, { params: this.createParams(params) })
  }

}
