import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from './Pedido';
import { EditarPedidoDTO } from './DTO/EditarPedidoDTO';
import { ItemPedidoDTO } from "./DTO/ItemPedidoDTO";
import { EditarProdutoDTO } from "./DTO/EditarProdutoDTO";
import { CriarPedidoDTO } from './DTO/CriarPedidoDTO';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:5070/pedidos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPedido(novoPedido: CriarPedidoDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, novoPedido);
  }

  updatePedido(pedido: Pedido): Observable<any> {
    var editarPedidoDTO: EditarPedidoDTO = new EditarPedidoDTO(pedido.nomeCliente, pedido.emailCliente, []);
    pedido.itensPedido?.forEach((item) => {
      const itemPedidoDTO = new ItemPedidoDTO(item.id!, item.quantidade, new EditarProdutoDTO(item.idProduto!, item.nomeProduto));
      editarPedidoDTO.itensPedido.push(itemPedidoDTO);
    });
    return this.http.put<any>(`${this.apiUrl}/${pedido.id}`, editarPedidoDTO);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
