import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItensPedidoService } from '../itens-pedido.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Pedido } from '../Pedido';

@Component({
  selector: 'app-pedido-detalhes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pedido-detalhes.component.html',
  styleUrls: ['./pedido-detalhes.component.css']
})

export class PedidoDetalhesComponent implements OnInit {
  @Input() pedidoId!: number;
  pedido: Pedido | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private itensPedidoService: ItensPedidoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.pedidoService.getPedidoById(id).pipe(
        catchError(error => {
          console.error('Erro ao buscar pedido:', error);
          return of(null);
        })
      ).subscribe(data => {
        this.pedido = data;
      });
    } else {
      console.error('ID não encontrado na rota');
    }
  }

  goBack(): void {
    this.router.navigate(['/pedido']);
  }
}
