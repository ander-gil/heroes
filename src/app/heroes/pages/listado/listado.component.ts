import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

   heroes:Heroe[]=[];

  ngOnInit():void {


      this.heroesservice.getHeroes()
      .subscribe(resp=>{
        this.heroes = resp;
      })

  }
  constructor(private heroesservice:HeroesService) { }

}
