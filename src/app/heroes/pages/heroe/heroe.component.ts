import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
   img{width: 100%;
       border-radius:5px;
      }`]
})
export class HeroeComponent implements OnInit {

    heroe!:Heroe;
  constructor(private activatedroute:ActivatedRoute,
              private heroesservicio:HeroesService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedroute.params
    .pipe(switchMap(({id})=>this.heroesservicio.getheroe(id)))
    .subscribe(heroe=>{
      this.heroe=heroe;
    })
  }

    regresar(){
      this.router.navigate(['/heroes/listado']);
    }

}
