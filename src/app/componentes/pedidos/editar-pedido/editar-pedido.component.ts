import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { ItensPedidoService } from '../itens-pedido.service';
import { catchError, of } from 'rxjs';
import { Pedido } from '../Pedido';
import { ItemPedido } from '../ItemPedido';

@Component({
  selector: 'app-editar-pedido',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-pedido.component.html',
  styleUrl: './editar-pedido.component.css'
})
export class EditarPedidoComponent implements OnInit {
  @Input() pedidoId!: number;
  pedido: Pedido | null = null;
  itemPedido: ItemPedido = {
    pedido: {nomeCliente: '', emailCliente: '', pago: false, dataCriacao: new Date()},
    produto: { nomeProduto: '', valor: 0 },
    quantidade: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private itensPedidoService: ItensPedidoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = + idParam;
      this.pedidoService.getPedidoById(id).pipe(
        catchError(error => {
          console.error('Erro ao buscar pedido:', error);
          return of(null);
        })
      ).subscribe(data => {
        this.pedido = data;
      });

      this.itensPedidoService.getItensPedidoByIdPedido(id).pipe(
        catchError(error => {
          console.error('Erro ao buscar itens do pedido:', error);
          return of([]);
        })
      ).subscribe(data => {
        this.itemPedido = data;
      });
    } else {
      console.error('ID não encontrado na rota');
    }
  }

  salvarPedido(){
    if(this.pedido){
      this.pedidoService.updatePedido(this.pedido!.id!, this.pedido!).subscribe(
        response => {
          console.log('Pedido atualizado com sucesso:', response);
        },
        error => {
          console.error('Erro ao atualizar pedido:', error);
        });

      this.itensPedidoService.updateItensPedido(this.itemPedido.id!, this.itemPedido).subscribe(
        response => {
          console.log('Item atualizado com sucesso:', response);
        },
        error => {
          console.error('Erro ao atualizar item:', error);
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/pedido']);
  }
}
