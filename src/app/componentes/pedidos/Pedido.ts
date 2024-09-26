import { ItemPedido } from "./ItemPedido";

export interface Pedido {
  id?: number;
  nomeCliente: string;
  emailCliente: string;
  dataCriacao: Date;
  pago: boolean;
  item?: ItemPedido;
}
