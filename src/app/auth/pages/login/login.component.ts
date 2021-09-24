import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private router: Router,
              private authservice:AuthService,) { }

  login() {

    this.authservice.login()
    .subscribe(usuario=>{
      console.log(usuario);
      if(usuario.id){
        this.router.navigate(['./heroes/listado'])
      }
    })
  }

  ingresarSinLOgin(){
    this.authservice.logout
    this.router.navigate(['./heroes']);
  }
}
