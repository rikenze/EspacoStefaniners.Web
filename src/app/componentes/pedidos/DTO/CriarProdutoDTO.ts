export class CriarProdutoDTO {
  nomeProduto: string;
  valor: number;

  constructor(nomeProduto: string = '', valor: number = 0) {
    this.nomeProduto = nomeProduto;
    this.valor = valor;
  }
}
