import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

export interface ItemPedido {
  id?: number;
  idPedido?: number;
  idProduto?: number;
  quantidade: number;
  pedido: Pedido;
  produto: Produto;
}
