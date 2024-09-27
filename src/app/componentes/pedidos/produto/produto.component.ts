import { Produto } from './../Produto';
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
  cervejas: Produto[] = [
    { nomeProduto: 'Skol', valor: 7.00, quantidade: 0 },
    { nomeProduto: 'Heineken', valor: 8.00, quantidade: 0 },
    { nomeProduto: 'Budweiser', valor: 7.50, quantidade: 0 },
    { nomeProduto: 'Corona', valor: 9.00, quantidade: 0 },
    { nomeProduto: 'StellaArtois', valor: 8.50, quantidade: 0 }
  ];

  formulario!: FormGroup;

  constructor(
    private pedidoService: PedidoService
    ,private itensPedidoService: ItensPedidoService
    ,private router: Router, private formBuilder : FormBuilder) {

      this.formulario = this.formBuilder.group({
        nomeCliente: ['', Validators.required],
        emailCliente: ['', [Validators.required, Validators.email]],
        Skol: ['0', Validators.required],
        Heineken: ['0', Validators.required],
        Budweiser: ['0', Validators.required],
        Corona: ['0', Validators.required],
        StellaArtois: ['0', Validators.required],
        quantidade: this.formBuilder.group({})})

        this.cervejas.forEach(cerveja => {
          (this.formulario.get('quantidade') as FormGroup).addControl(cerveja.nomeProduto,
            this.formBuilder.control(1, [Validators.required, Validators.min(0), Validators.max(100)]));
        });
  }

  ngOnInit(): void {}

  criarPedido(): void {
    if (this.formulario.valid) {
      const produto = this.cervejas.map(cerveja => {
        return {
          nomeProduto: cerveja.nomeProduto,
          quantidade: this.formulario.get(cerveja.nomeProduto)?.value,
          valor: cerveja.valor
        };
      }).filter(x => x.quantidade > 0).find(x => true);
      this.itensPedidoService.createItensPedido(this.formulario.value, produto).subscribe((pedidoCriado) => {
      }, error => {
        console.error('Erro ao criar pedido:', error);
      });
    }
  }

  fazerPedido(): void {
    if (this.formulario.valid) {
    }
  }

  pedidosPagina(): void {
    this.router.navigate(['/pedido']);
  }


}
