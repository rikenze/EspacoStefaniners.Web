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

export class ItemPedidoDTO {
  id: number;
  quantidade: number;
  Produto: EditarProdutoDTO;

  constructor(id: number, quantidade: number, editarProdutoDTO: EditarProdutoDTO) {
    this.id = id;
    this.quantidade = quantidade;
    this.Produto = editarProdutoDTO;
  }
}

export class EditarProdutoDTO {
  id: number;
  nomeProduto: string;

  constructor(id: number, nomeProduto: string){
    this.id = id;
    this.nomeProduto = nomeProduto;
  }
}
