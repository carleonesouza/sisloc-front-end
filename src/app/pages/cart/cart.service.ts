import { Injectable } from '@angular/core';
import { Modalidade } from 'app/models/modalidade';
import { Produto } from 'app/models/produto';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    items: any[] = []
    modalidades: Modalidade[] = [];
    constructor() { }



    addItem(item: any) {
        this.items.push(item)
        sessionStorage.setItem("cart", JSON.stringify(this.items))
    }

    removeItem(any) {
        this.items.splice(this.items.indexOf(any), 1)
        //salva na sessão
        sessionStorage.setItem("cart", JSON.stringify(this.items))
    }

    total(): number {
        
        const produtos = JSON.parse(sessionStorage.getItem("cart"));
        produtos.map((p) =>{
            this.modalidades.push(p.modalidade);
        })
      
        if (this.modalidades.length > 0) {
            return this.modalidades.map(item => item.preco)
                .reduce((prev, value) => prev + value, 0)
        }
        return 0;

    }
    totalIns(): number {
        const produtos = JSON.parse(sessionStorage.getItem("cart"));
        produtos.map((p) =>{
            this.modalidades.push(p.modalidade);
        })
        if (this.modalidades.length > 0) {
            return this.modalidades.map(item => item.preco)
                .reduce((prev, value) => prev + value, 0)
        }
        return 0;
    }
    installment(): number {
        const produtos = JSON.parse(sessionStorage.getItem("cart"));
        produtos.map((p) =>{
            this.modalidades.push(p.modalidade);
        })
        if (this.modalidades.length > 0) {
            return Math.max.apply(
                Math, this.modalidades
                    .map(function (prod) {
                        return prod.preco;
                    }))
        }

    }
}
