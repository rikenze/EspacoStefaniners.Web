import { Routes, RouterModule } from '@angular/router';
import { PedidoComponent } from './componentes/pedidos/pedido/pedido.component';
import { ProdutoComponent } from './componentes/pedidos/produto/produto.component';
import { NgModule } from '@angular/core';
import { PedidoDetalhesComponent } from './componentes/pedidos/pedido-detalhes/pedido-detalhes.component';
import { EditarPedidoComponent } from './componentes/pedidos/editar-pedido/editar-pedido.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pedido',
    pathMatch: 'full'
  },
  {
    path: 'pedido',
    component: PedidoComponent
  },
  {
    path: 'pedidoDetalhes/:id',
    component: PedidoDetalhesComponent
  },
  {
    path: 'editarPedido/:id',
    component: EditarPedidoComponent
  },
  {
    path: 'produto',
    component: ProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
