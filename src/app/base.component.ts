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
     if(this.authService.check()){
        this.router.navigate(['/loja/produtos']);
     }else{
      this.authService.signOut();
     }

  }

}
