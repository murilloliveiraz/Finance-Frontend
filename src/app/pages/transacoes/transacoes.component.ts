import { SistemaService } from './../../services/Sistema.service';
import { TransacoesService } from './../../services/Transacoes.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/Categoria.service';
import { Transacao } from 'src/app/models/Transacao';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListDespesas: Array<any>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  configpage() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  cadastro()
  {
    this.tipoTela = 2;
    this.transacoesForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  ListaDespesasUsuario() {
    this.tipoTela = 1;

    this.transacoesService.ListarDespesasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Transacao>) => {

        this.tableListDespesas = response;
      }, (error) => console.error(error),
        () => { })

  }


  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public categoriaService: CategoriaService,
    public transacoesService: TransacoesService,
    public sistemaService: SistemaService
  ) {
  }

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();


  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();

  transacoesForm: FormGroup;


  ngOnInit(){
    this.menuService.menuSelecionado = 4;

    this.configpage();
    this.transacoesForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          data: ['', [Validators.required]],
          sistemaSelect: ['', [Validators.required]],
          categoriaSelect: ['', [Validators.required]],
        }
      )

    this.ListaDespesasUsuario();
    this.ListaCategoriasUsuario();
  }

  dadosForm() {
    return this.transacoesForm.controls;
  }

  handleChangePago(item: any){
    this.checked = item.checked as boolean;
  }

  enviar() {
    var dados = this.dadosForm();

    if (this.itemEdicao) {
      this.itemEdicao.Name = dados["name"].value;
      this.itemEdicao.Value = dados["valor"].value;
      this.itemEdicao.DueDate = dados["data"].value;
      this.itemEdicao.IdCategory = parseInt(this.categoriaSelect.id);
      this.itemEdicao.PropName="";
      this.itemEdicao.Message="";
      this.itemEdicao.notifications=[];

      this.transacoesService.AtualizarDespesa(this.itemEdicao)
      .subscribe((response: Transacao) => {

        this.transacoesForm.reset();
        this.ListaDespesasUsuario();

      }, (error) => console.error(error),
        () => { })

    } else {

    let item = new Transacao();
    item.Name = dados["name"].value;
    item.Value = dados["valor"].value;
    item.DueDate = dados["data"].value;
    item.AlreadyPaid = this.checked;
    item.IdCategory = parseInt(this.categoriaSelect.id);

    this.transacoesService.AdicionarDespesa(item)
      .subscribe((response: Transacao) => {
        this.transacoesForm.reset();
        this.ListaDespesasUsuario();
      }),
      (error) => console.error(error), () => {}
    }
  }

  ListaCategoriasUsuario(id: number = null) {
    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<any>) => {
        var listaCategoriasUsuario = [];

        response.forEach(x => {
          var item = new SelectModel();
          item.id = x.id.toString();
          item.name = x.name;

          listaCategoriasUsuario.push(item);

          if(id && id == x.id ){
            this.categoriaSelect = item;
          }
        });

        this.listCategorias = listaCategoriasUsuario;
      })
  }

  itemEdicao: any;

  edicao(id: number) {
   this.transacoesService.ObterDespesa(id)
     .subscribe((response: any) => {
       if (response){
         this.itemEdicao = response;
         this.tipoTela = 2;
         console.log(response)
         var dados = this.dadosForm();

         dados["name"].setValue(this.itemEdicao.name);
         dados["valor"].setValue(this.itemEdicao.value);
         var dateToString = response.dueDate.toString();
          var dateFull = dateToString.split('-');
          var dayFull = dateFull[2].split('T');
          var day = dayFull[0];
          var month = dateFull[1];
          var year = dateFull[0];

          var dateInput = year + '-' + month + '-' + day;

          dados["data"].setValue(dateInput);
          this.ListaCategoriasUsuario(response.idCategory)
          this.checked = response.alreadyPaid;
       }
     },
     (error) => console.error(error),
       () => {}
     )
  }
}
