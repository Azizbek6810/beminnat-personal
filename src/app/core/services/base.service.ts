import { Inject, Injectable } from '@angular/core';
import { DI } from '../utils/di';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    @Inject(DI.API_URL) private apiUrl: string,
    private http: HttpClient,
  ) {}

  get<T>(url: string) {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  post<T>(url: string, data: any) {
    return this.http.post<T>(`${this.apiUrl}${url}`, data);
  }

  put<T>(url: string, id: number, data: any) {
    return this.http.put<T>(`${this.apiUrl}${url}/${id}`, data);
  }

  delete<T>(url: string, id: number) {
    return this.http.delete<T>(`${this.apiUrl}${url}/${id}`);
  }
}
