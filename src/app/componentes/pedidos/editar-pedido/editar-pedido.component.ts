import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { catchError, of } from 'rxjs';
import { Pedido } from '../Pedido';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
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
    } else {
      console.error('ID não encontrado na rota');
    }
  }

  salvarPedido(){
    if(this.pedido){
      this.pedidoService.updatePedido(this.pedido!).subscribe(
        response => {
          console.log('Pedido atualizado com sucesso:', response);
        },
        error => {
          console.error('Erro ao atualizar pedido:', error);
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/pedido']);
  }
}
