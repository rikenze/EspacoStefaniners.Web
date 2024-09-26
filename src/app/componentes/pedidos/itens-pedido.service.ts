import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItensPedidoService {
  private apiUrl = 'http://localhost:5070/itenspedido';

  constructor(private http: HttpClient) {}

  getItensPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItensPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getItensPedidoByIdPedido(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/idPedido/${id}`);
  }

  createItensPedido(itensPedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, itensPedido);
  }

  updateItensPedido(id: number, itensPedido: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, itensPedido);
  }

  deleteItensPedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
