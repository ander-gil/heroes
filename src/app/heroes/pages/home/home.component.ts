import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [ `
    .container {padding:10px}
  `
  ]
})
export class HomeComponent  {

  get auth(){
    return this.authservice.Auth;  // se llama el metodo get que esta en el servicio de auth
  }
  constructor(private router: Router,
              private authservice: AuthService) { }

  logout(){
    this.router.navigate(['./auth'])
  }

}
