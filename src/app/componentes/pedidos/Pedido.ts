import { ItemPedido } from "./ItemPedido";

export interface Pedido {
  id?: number;
  nomeCliente: string;
  emailCliente: string;
  pago: boolean;
  valorTotal: number;
  itensPedido?: ItemPedido[];
}
