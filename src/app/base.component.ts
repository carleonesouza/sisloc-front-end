import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-base',
  template:'',
})
export class BaseComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

   ngOnInit(): void {
    console.log('Aqui');
     if(this.authService.check()){
        this.router.navigate(['/inicio']);
     }else{
      this.authService.signOut();
      console.log('Aqui');
     }

  }

}
