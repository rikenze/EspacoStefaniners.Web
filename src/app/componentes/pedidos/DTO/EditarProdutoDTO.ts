
export class EditarProdutoDTO {
  id: number;
  nomeProduto: string;

  constructor(id: number, nomeProduto: string) {
    this.id = id;
    this.nomeProduto = nomeProduto;
  }
}
