import { ItemPedidoDTO } from "./ItemPedidoDTO";

export class EditarPedidoDTO {
  nomeCliente: string;
  emailCliente: string;
  itensPedido: ItemPedidoDTO[];

  constructor(nomeCliente: string, emailCliente: string, itensPedido: ItemPedidoDTO[]) {
    this.nomeCliente = nomeCliente;
    this.emailCliente = emailCliente;
    this.itensPedido = itensPedido;
  }
}
