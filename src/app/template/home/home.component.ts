import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService, HomeServiceComponents } from './home.service'
import { Home } from './home'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']

})
export class HomeComponent implements OnInit {

  public novocarro: Home = new Home();

  desktop: boolean;
  private mediaService = new HomeServiceComponents('(min-width: 768px)');
  arrowLeft = 'assets/icons/arrow-left-solid.svg';
  arrowRight = 'assets/icons/arrow-right-solid.svg';
  lupa = 'assets/icons/search-solid.svg';
  trash = 'assets/icons/trash-alt-regular.svg';
  edit = 'assets/icons/edit-regular.svg';
  car = 'assets/images/car.png';
  itensByPage: number = 10;
  numPagination: number;
  inicioPaginacao: number = 1;
  btnAnterior: number = 1;
  btnAtual: number = 1;
  status: boolean = false;
  carros: any[];
  pageList: any[] = [];
  deleteId: number;
  form: FormGroup;
  changecarro: any[]; 

  
  constructor(
    private homeServices: HomeService,
    private router: Router,
    fb: FormBuilder
  ) { 
    this.form = fb.group({
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.mediaService.match$.subscribe(value => this.desktop = value);
    this.criaPaginacao();
    
    this.homeServices.listaPagCarros(this.btnAtual).subscribe(
      response => {
        this.carros = response;
      },
      erro => {

      }
    )
    
  }

  public criaPaginacao(){
    this.homeServices.listaCarros().subscribe(
      response => {

        let numPages = (response.length / this.itensByPage).toString().split(".", 2);
        
        this.numPagination = Number(numPages[0]);

        this.pageList = [];

        for (var i = 1; i <= this.numPagination; i++) {
          this.pageList.push(i);
        }
  
      },
      error => {
        console.error();
      }
    );
  }

  public numPaginacao(num: number){
    document.getElementById("btn-pag"+this.btnAnterior).classList.remove("ativo");
    document.getElementById("btn-pag"+this.btnAnterior).classList.add("inativo");
    this.btnAnterior = num;
    this.btnAtual = num;
    document.getElementById("btn-pag"+this.btnAnterior).classList.remove("inativo");
    document.getElementById("btn-pag"+this.btnAnterior).classList.add("ativo");

    this.homeServices.listaPagCarros(num).subscribe(
      response => {
        this.carros = response;
      },
      erro => {

      }
    )

  }

  public inicioPag(){
    if(this.btnAtual > 1){
      // this.btnAnterior = this.btnAtual;
      this.btnAtual = this.btnAtual - 1;
      document.getElementById("btn-pag"+this.btnAtual).classList.remove("inativo");
      document.getElementById("btn-pag"+this.btnAtual).classList.add("ativo");
      this.btnAnterior = this.btnAtual + 1;
      document.getElementById("btn-pag"+this.btnAnterior).classList.remove("ativo");
      document.getElementById("btn-pag"+this.btnAnterior).classList.add("inativo");
      this.homeServices.listaPagCarros(this.btnAtual).subscribe(
        response => {
          this.carros = response;
        },
        erro => {
  
        }
      ) 
    }
  }

  public fimPag(){
    if(this.btnAtual < this.numPagination){
      // this.btnAnterior = this.btnAtual;
      this.btnAtual = this.btnAtual + 1;
      document.getElementById("btn-pag"+this.btnAtual).classList.remove("inativo");
      document.getElementById("btn-pag"+this.btnAtual).classList.add("ativo");
      this.btnAnterior = this.btnAtual - 1;
      document.getElementById("btn-pag"+this.btnAnterior).classList.remove("ativo");
      document.getElementById("btn-pag"+this.btnAnterior).classList.add("inativo");
      this.homeServices.listaPagCarros(this.btnAtual).subscribe(
        response => {
          this.carros = response;
        },
        erro => {
  
        }
      ) 
    }
  }

  public searchPlate(){
    let plate: string = (<HTMLInputElement>document.getElementById("plate-search")).value;
    if(plate == ""){
      this.router.navigate(['home/'])
    .then(() => {
      window.location.reload();
    });
    }
    
    this.homeServices.searchPlate(plate).subscribe(
      response => {
        let numPages = (response.length / this.itensByPage).toString().split(".", 2);
        
        this.numPagination = Number(numPages[0]);

        this.pageList = [];

        for (var i = 1; i <= this.numPagination; i++) {
          this.pageList.push(i);
        }
        
        this.carros = response;
      },
      erro => {

      }
    ) 
  }

  public novoCarro(){
    this.homeServices.novoCarro(this.novocarro).subscribe(
      response => { 
        this.router.navigate(['home/'])
        .then(() => {
        window.location.reload();});
      },
      error => {
        alert(error.error)
      }
    )
  }

  public editarCarro(id: string){
    document.getElementById("modal-cadastrar").classList.remove("hidden");

    this.homeServices.editaCarro(id).subscribe(
      response => { 
        this.changecarro = response;
      },
      error => {
        alert(error.error)
      }
    )
  }

  public deletarCarro(id: number){
    document.getElementById("modal-deletar").classList.remove("hidden");
    this.deleteId = id;
  }

  public exibeModalCadastro(){
    document.getElementById("modal-cadastrar").classList.remove("hidden");
  }

  delCarro(id: string){
    this.homeServices.delCar(id).subscribe(
      response => {
        this.router.navigate(['home/'])
        .then(() => {
        window.location.reload();});
        
      },
      erro => {
        if(erro.msg){
          alert(erro.msg)
        }else{
          alert(erro.error)
        }
      }
    ) 
  }

  delCancel(){
    document.getElementById("modal-deletar").classList.remove("hidden");
    document.getElementById("modal-deletar").classList.add("hidden");
  }
}
