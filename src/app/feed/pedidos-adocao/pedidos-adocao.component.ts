import { PedidosAdocao } from './../../model/PedidosAdocao';
import { AdocaoService } from './../../services/adocao.service';
import { PedidosAdocaoService } from './../../services/pedidos-adocao.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../model/Animal';
import { Message } from 'primeng/components/common/api';
import { Adocao } from '../../model/Adocao';

@Component({
  selector: 'app-pedidos-adocao',
  templateUrl: './pedidos-adocao.component.html',
  styleUrls: ['./pedidos-adocao.component.css']
})
export class PedidosAdocaoComponent implements OnInit {
  animal: Animal;
  animais: Animal[];
  pedido: PedidosAdocao;
  id: string;
  listaDePedidos: any[] = [];
  msgs: Message[];
  adocoes: Adocao[];

  constructor(private pedidoService: PedidosAdocaoService, private route: ActivatedRoute, private rota: Router,
    private adocaoService: AdocaoService) {
    this.pedido = new PedidosAdocao;
    this.pedido.animal = new Animal;
  }

  ngOnInit() {
    this.carregarAdocoes();
  }

  private carregarAdocoes() {
    this.adocaoService.listarTodosAdocao()
      .toPromise()
      .then(lista => {
        this.adocoes = lista;
        this.carregarPedidos();
      });
  }

  private carregarPedidos() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.listar();
      });
  }

  listar() {
    this.pedidoService.listarPorIdAnimal(this.id).subscribe(listaDePedidos => {
      this.listaDePedidos = listaDePedidos;
      this.listaDePedidos.forEach(pedido => {
        const adocoes = this.adocoes.filter(a => a.idPedido === pedido.id);
        pedido['status'] = adocoes.length !== 0 ? 'Adotado' : 'Pendente';
      });
    });

  }
  permitirAdocao(pedido) {
    this.adocaoService.salvar(pedido.id).then(() => {
      this.showSuccess()
      this.rota.navigate(["feed/meus-animais"])
      //chama o método de status pra atualizar
    }).catch(error => {
      this.showError()
      console.error(error);
    })
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: "success", summary: 'Adoção permitida', detail: 'Status do animal: Adotado' });
  }
  showError() {
    this.msgs = [];
    this.msgs.push({ severity: "error", summary: 'Erro ao permitir adoção' });
  }
}