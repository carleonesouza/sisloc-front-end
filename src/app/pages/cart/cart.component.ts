import { Component, OnInit } from '@angular/core';
import { Produto } from 'app/models/produto';
import { CartService } from './cart.service';
import { default as swal } from 'sweetalert2'
import {default as NProgress} from 'nprogress'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
    //sessionStorage.removeItem("cart")
    let cartSession = sessionStorage.getItem("cart");
    //carrinho não está vazio
    if(cartSession != null){
      this.cartService.items = JSON.parse(cartSession);
    }
  }

  items(): Produto[] {
    return this.cartService.items;
  }
  removeItem(Product){
    let c = this.cartService
    swal.fire({
      title: 'Confirmação',
      text: "Você tem certeza que deseja remover este item do carrinho?"}).then(function () {
      NProgress.start()
      swal.update({
      icon:'success'
     } )
      NProgress.done()
      return c.removeItem(Product)

    })


  }

  total() :number{

    return this.cartService.total()
  }

  totalIns() :number{
    return this.cartService.totalIns()
  }

  installments(){
    return this.cartService.installment()
  }

}
