import { CriarProdutoDTO } from "./CriarProdutoDTO";

export class CriarItemPedidoDTO {
  produto: CriarProdutoDTO;
  quantidade: number;

  constructor(produto: CriarProdutoDTO = new CriarProdutoDTO(), quantidade: number = 0) {
      this.produto = produto;
      this.quantidade = quantidade;
  }
}
