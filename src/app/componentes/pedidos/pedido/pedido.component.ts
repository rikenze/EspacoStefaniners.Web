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

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarPedidos();

    // this.pedidoService.getPedidos().subscribe(data => {
    //   this.pedidos = data;
    // });
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
}
