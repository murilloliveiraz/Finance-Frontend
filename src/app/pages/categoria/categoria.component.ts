import { CategoriaService } from './../../services/Categoria.service';
import { SistemaService } from './../../services/Sistema.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { Categoria } from 'src/app/models/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListCategorias: Array<any>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  configpag() {
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
    this.categoriaForm.reset();
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

  ListaCategoriasUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Categoria>) => {

        this.tableListCategorias = response;
      }, (error) => console.error(error),
        () => { })

  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public sistemaService: SistemaService,
    public categoriaService: CategoriaService
  ) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          sistemaSelect: ['', Validators.required]
        }
      )

      this.configpag();
      this.ListaSistemasUsuario();
      this.ListaCategoriasUsuario();
  }


  dadosForm() {
    return this.categoriaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    if (this.itemEdicao) {
      this.itemEdicao.Name = dados["name"].value;
      this.itemEdicao.IdSystem = parseInt(this.sistemaSelect.id);
      this.itemEdicao.PropName="";
      this.itemEdicao.Message="";
      this.itemEdicao.notifications=[];

      this.categoriaService.AtualizarCategoria(this.itemEdicao)
      .subscribe((response: Categoria) => {

        this.categoriaForm.reset();
        this.ListaCategoriasUsuario();

      }, (error) => console.error(error),
        () => { })
    } else {
    let item = new Categoria();
    item.Name = dados["name"].value;
    item.Id = 0;
    item.IdSystem = parseInt(this.sistemaSelect.id);

    this.categoriaService.AdicionarCategoria(item)
      .subscribe((response: Categoria) => {
        this.categoriaForm.reset();
        this.ListaCategoriasUsuario();
      }),
      (error) => console.error(error), () => {}
    }
  }

  ListaSistemasUsuario(id: number = null) {
    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<any>) => {
        var listaSistemaFinanceiro = [];
        response.forEach(x => {
          var item = new SelectModel();
          item.id = x.id.toString();
          item.name = x.name;

          listaSistemaFinanceiro.push(item);

          if(id && id == x.id ){
            this.sistemaSelect = item;
          }
        });

        this.listSistemas = listaSistemaFinanceiro;
      })
  }

  itemEdicao: any;

   edicao(id: number) {
    this.categoriaService.ObterCategoria(id)
      .subscribe((response: any) => {
        if (response){
          this.itemEdicao = response;
          this.tipoTela = 2;

          var dados = this.dadosForm();

          dados["name"].setValue(this.itemEdicao.name);
          this.ListaSistemasUsuario(response.idSystem)
        }
      },
      (error) => console.error(error),
        () => {}
      )
   }
}
