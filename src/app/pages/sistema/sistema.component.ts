import { UsuarioSistemaService } from './../../services/usuario-sistema.service';
import { SistemaService } from './../../services/Sistema.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição

  tableListSistemas: Array<any>;
  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  tableListUsuariosistema: Array<any>;
  id2: string;
  page2: number = 1;
  config2: any;
  paginacao2: boolean = true;
  itemsPorPagina2: number = 10

  color: ThemePalette = 'accent';
  disabled = false;
  sistemaForm: FormGroup;
  checked: boolean = false;

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };

    this.id2 = this.gerarIdParaConfigDePaginacao();

    this.config2 = {
      id: this.id2,
      currentPage: this.page2,
      itemsPerPage: this.itemsPorPagina2

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
    this.sistemaForm.reset();
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

  mudarItemsPorPage2() {
    this.page2 = 1
    this.config2.currentPage = this.page2;
    this.config2.itemsPerPage = this.itemsPorPagina2;
  }

  mudarPage2(event: any) {
    this.page2 = event;
    this.config2.currentPage = this.page2;
  }


  ListaSistemasUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<SistemaFinanceiro>) => {

        this.tableListSistemas = response;
      }, (error) => console.error(error),
        () => { })

  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService,
    public authService: AuthService,
    public usuarioSistemaService: UsuarioSistemaService
  ){}


  ngOnInit(){
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListaSistemasUsuario();
    this.sistemaForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        month: ['', [Validators.required]],
        year: ['', [Validators.required]],
        closingdate: ['', [Validators.required]],
        copyMonth: ['', [Validators.required]],
        copyYear: ['', [Validators.required]],
      }
    )
  }

  handleChangePago(item: any){
    this.checked = item.checked as boolean;
  }

  dadosForm(){
    return this.sistemaForm.controls;
  }

  enviar()
  {
    var dados = this.dadosForm();

    if (this.itemEdicao) {
      this.itemEdicao.Name = dados["name"].value;
      this.itemEdicao.Month = dados["month"].value;
      this.itemEdicao.Year = dados["year"].value;
      this.itemEdicao.Closingdate = dados["closingdate"].value;
      this.itemEdicao.GenerateExpensesCopy = this.checked;
      this.itemEdicao.CopyMonth = dados["copyMonth"].value;
      this.itemEdicao.CopyYear = dados["copyYear"].value;
      this.itemEdicao.PropName="";
      this.itemEdicao.Message="";
      this.itemEdicao.notifications=[];

      this.sistemaService.AtualizarSistemaFinanceiro(this.itemEdicao)
      .subscribe((response: SistemaFinanceiro) => {

        this.sistemaForm.reset();
        this.ListaSistemasUsuario();

      }, (error) => console.error(error),
        () => { })
    } else {

      let item = new SistemaFinanceiro();
      item.Name = dados["name"].value;
      item.Id = 0;
      item.Month = dados["month"].value;
      item.Year = dados["year"].value;
      item.GenerateExpensesCopy = this.checked;
      item.Closingdate = dados["closingdate"].value;
      item.CopyMonth = dados["copyMonth"].value;
      item.CopyYear = dados["copyYear"].value;

      this.sistemaService.AdicionarSistemaFinanceiro(item)
      .subscribe((response: any) => {
          this.sistemaForm.reset();
          this.sistemaService.CadastrarUsuarioNoSistema(response.result.id, this.authService.getEmailUser())
          .subscribe((response: any) => {
            this.ListaSistemasUsuario();
          }),
          (error) => console.error(error), () => {}
        }),
        (error) => console.error(error), () => {}
    }
  }

   itemEdicao: any;

   edicao(id: number) {
    this.sistemaService.ObterSistemaFinanceiro(id)
      .subscribe((response: SistemaFinanceiro) => {
        if (response){
          this.itemEdicao = response;
          this.tipoTela = 2;

          var dados = this.dadosForm();

          dados["name"].setValue(this.itemEdicao.name);
          dados["month"].setValue(this.itemEdicao.month);
          dados["year"].setValue(this.itemEdicao.year);
          this.checked = this.itemEdicao.GenerateExpensesCopy;
          dados["closingdate"].setValue(this.itemEdicao.closingdate);
          dados["copyMonth"].setValue(this.itemEdicao.copyMonth);
          dados["copyYear"].setValue(this.itemEdicao.copyYear);

          this.ListarUsuariosSistema();
        }
      },
      (error) => console.error(error),
        () => {}
      )
   }

  emailUsuarioSistema: string = "";
  emailUsuarioSistemaValid: boolean = true;
  textValid: string = "Campo Obrigatório!";

   ListarUsuariosSistema() {
    this.usuarioSistemaService.ListarUsuariosSistema(this.itemEdicao.id)
      .subscribe((response: Array<any>) => {
        this.tableListUsuariosistema = response
      })
  }

  excluir(id: number) {
    this.usuarioSistemaService.DeleteUsuarioSistemaFinanceiro(id)
      .subscribe((response: SistemaFinanceiro) => {

        if (response) {
          this.edicao(this.itemEdicao.Id)
          this.emailUsuarioSistema = "";
        }

      },
        (error) => console.error(error),
        () => {

        })
  }


  addUsuarioSistema() {
    this.emailUsuarioSistemaValid = true;

    if (!this.emailUsuarioSistema) {
      this.emailUsuarioSistemaValid = false;
    }
    else {

      this.sistemaService.CadastrarUsuarioNoSistema(this.itemEdicao.id, this.emailUsuarioSistema)
        .subscribe((response: any) => {

          if (response) {
            this.edicao(this.itemEdicao.Id)
            this.emailUsuarioSistema = "";
          }

        }, (error) => console.error(error),
          () => { })
    }
  }

}
