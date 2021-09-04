import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:10px
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers= [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ]

  heroe: Heroe={
    superhero:'',
    publisher:Publisher.DCComics,
    alter_ego:'',
    first_appearance:'',
    characters:'',
    alt_img:''

  }

  constructor(private heroesService:HeroesService,
              private activatedroute:ActivatedRoute,
              private router:Router,
              private snackbar:MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    // (!this.router.url.includes('editar')) con esto lo que se hace es saber si la url incluye la palabra editar
    //   si es asi le decimos que no haga nada de lo contrario, que nos traiga el id de la url

    if(!this.router.url.includes('editar')){
      return;
    }else{
      this.activatedroute.params
      .pipe(switchMap(({id})=>this.heroesService.getheroe(id)))
      .subscribe(heroe=>{
        this.heroe=heroe;
      })
    }
  }

  guardar(){
    if(this.heroe.superhero.trim().length===0){
      return;
    }
    if(this.heroe.id){
        this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe=>{
          this.mostrarsnakbar("actualizado con exito");
        })
    }else{
        this.heroesService.agregarHeroe(this.heroe).
      subscribe(heroe=>{
        this.mostrarsnakbar("se agrego nuevo heroe!");
        this.router.navigate(['heroes/editar', heroe.id]);
      })
    }

  }

  borrar(){

   const dialogo = this.dialog.open(ConfirmarComponent, {width: '250px',
    data: this.heroe });

    dialogo.afterClosed()
    .subscribe(result=>{
      if(result){
        this.heroesService.borrarHeroe(this.heroe.id!)
        .subscribe(heroe=>{
          this.mostrarsnakbar("eliminado con exito");
          this.router.navigate(['heroes/listado'])
        })
      }
    })
  }

  mostrarsnakbar(mensaje:string){
    this.snackbar.open(mensaje, 'ok!', {duration: 2000});
  }



}
