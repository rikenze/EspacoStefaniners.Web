import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemPedido } from './ItemPedido';
import { Produto } from './Produto';
import { Pedido } from './Pedido';

@Injectable({
  providedIn: 'root'
})
export class ItensPedidoService {
  private apiUrl = 'http://localhost:5070/itenspedido';
  itemPedido!: ItemPedido;
  itensPedido: ItemPedido[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(){

  }

  getItensPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItensPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getItensPedidoByIdPedido(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/idPedido/${id}`);
  }

  createItensPedido(itensPedido: any, produtos: Produto[]): Observable<any> {
    this.itensPedido = produtos.map(p => ({
      quantidade: p.quantidade!,
      pedido: {
        nomeCliente: itensPedido.nomeCliente,
        emailCliente: itensPedido.emailCliente,
        dataCriacao: new Date(),
        pago: true,
      },
      produto: {
        nomeProduto: p.nomeProduto,
        valor: p.valor,
      },
    }));
    return this.http.post<any>(this.apiUrl, this.itensPedido);
  }

  updateItensPedido(id: number, itensPedido: ItemPedido): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, itensPedido);
  }

  deleteItensPedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
