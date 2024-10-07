import { CriarItemPedidoDTO } from "./CriarItemPedidoDTO";

export class CriarPedidoDTO {
  nomeCliente: string;
  emailCliente: string;
  pago: boolean;
  itensPedido: CriarItemPedidoDTO[];

  constructor(
    nomeCliente: string = '',
    emailCliente: string = '',
    pago: boolean = false,
    itensPedido: CriarItemPedidoDTO[] = []
  ) {
    this.nomeCliente = nomeCliente;
    this.emailCliente = emailCliente;
    this.pago = pago;
    this.itensPedido = itensPedido;
  }
}
