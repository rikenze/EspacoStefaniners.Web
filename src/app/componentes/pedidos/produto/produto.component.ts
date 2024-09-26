import { Produto } from './../Produto';
import { Pedido } from './../Pedido';
import { ItemPedido } from './../ItemPedido';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItensPedidoService } from '../itens-pedido.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  pedidos: Pedido[] = [];
  cervejas: Produto[] = [
    { nomeProduto: 'Skol', valor: 7.00, quantidade: 0 },
    { nomeProduto: 'Heineken', valor: 8.00, quantidade: 0 },
    { nomeProduto: 'Budweiser', valor: 7.50, quantidade: 0 },
    { nomeProduto: 'Corona', valor: 9.00, quantidade: 0 },
    { nomeProduto: 'Stella Artois', valor: 8.50, quantidade: 0 }
  ];

  formulario!: FormGroup;

  // novoPedido: Pedido = {
  //   nomeCliente: '',
  //   emailCliente: '',
  //   dataCriacao: new Date(),
  //   pago: false,
  //   item: {
  //     produto: {
  //       nomeProduto: 'Skol',
  //       valor: 7.00,
  //       quantidade: 0
  //     },
  //     pedido: {
  //       nomeCliente: 'Skol',
  //       emailCliente: '',
  //       dataCriacao: new Date(),
  //       pago: false
  //     },
  //     quantidade: 1
  //   }
  // }

  constructor(
    private pedidoService: PedidoService
    ,private itensPedidoService: ItensPedidoService
    ,private router: Router, private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nomeCliente: ['', Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ]) ],
        emailCliente: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]) ],
      quantidade: 0
    })

    this.pedidoService.getPedidos().subscribe(data => {
      this.produtos = data.flatMap(pedido => pedido.items);
    });
  }

  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  criarPedido(): void {
    this.itensPedidoService.createItensPedido(this.formulario).subscribe((pedidoCriado) => {
      this.pedidos.push(pedidoCriado);
    }, error => {
      console.error('Erro ao criar pedido:', error);
    });
  }

  adicionarCerveja(): void {
    // if (cerveja.quantidade > 0) {

      // this.novoPedido.item = {
      //   produto: {
      //     nomeProduto: cerveja.nomeProduto,
      //     valor: cerveja.valor,
      //     quantidade: cerveja.quantidade
      //   },
      //   pedido: {
      //     nomeCliente: this.novoPedido.nomeCliente,
      //     emailCliente: this.novoPedido.emailCliente,
      //     dataCriacao: this.novoPedido.dataCriacao,
      //     pago: this.novoPedido.pago
      //   },
      //   quantidade: 1
      // }

      // cerveja.quantidade = 0;
    // }
  }

  pedidosPagina(): void {
    this.router.navigate(['/pedido']);
  }


}
