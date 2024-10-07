import { EditarProdutoDTO } from "./EditarProdutoDTO";


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
