import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})

export class PedidoComponent implements OnInit {
  pedidos: any[] = [];
  isCancelarModalAberto: boolean = false;
  pedidoIdSelecionado: number | null = null;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  pedidoDetalhes(id: number): void {
    this.router.navigate(['/pedidoDetalhes', id]);
  }

  produtosPagina(): void {
    this.router.navigate(['/produto']);
  }

  abrirCancelarModal(pedidoId: number): void {
    this.pedidoIdSelecionado = pedidoId;
    this.isCancelarModalAberto = true;
  }

  fecharCancelarModal(): void {
    this.isCancelarModalAberto = false;
    this.pedidoIdSelecionado = null;
  }

  confirmarCancelamento(): void {
    if (this.pedidoIdSelecionado !== null) {
      this.pedidoService.deletePedido(this.pedidoIdSelecionado).subscribe({
        complete: () => {
        // Atualizar a lista de pedidos após o cancelamento
        this.pedidos = this.pedidos.filter(pedido => pedido.id !== this.pedidoIdSelecionado);
        this.fecharCancelarModal();
        },
        error: (e) => console.error(e)}
      );
    }
  }
}
