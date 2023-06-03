import { Injectable } from '@angular/core';
import { ListProduct } from 'app/models/carrinho';
import { Produto } from 'app/models/produto';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private _productList: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

    setList;
    listProduct;
    locacao: ListProduct[] = [];
    constructor() {
        this.setList = new Set();
        this.listProduct = new ListProduct();
        this.listProduct.produtos = [];
        this.listProduct.total = 0;
        this.listProduct.quantidade = 0;
    }



    addItem(item: Produto) {
        this.addProductToList(item);

    }

    getListOfProducts(): Observable<any[]> {
        if (JSON.parse(sessionStorage.getItem("cart"))) {
            this._productList.next([JSON.parse(sessionStorage.getItem("cart"))]);
            return this._productList.asObservable();
        }

    }

    removeItem(produto: Produto) {
        this.locacao = JSON.parse(sessionStorage.getItem("cart"));
        this.setList.add(this.locacao);
        const iterators = this.setList.values();
        const values = iterators.next().value;
        values.map((item: any, index: any) => {           
            if(item.produtos.length > 0){
                item.produtos.map((a: any) => {
                    if(String(a.modalidades[0]._id).localeCompare(produto.modalidades[0]._id)  === 0){
                        values.splice(index, 1);  
                        item.quantidade -= 1;
                        item.total -= a.modalidades.map(itm => itm.preco).reduce((prev, value) => prev + value, 0);                  
                    }
                    sessionStorage.setItem("cart", JSON.stringify(values));
                    this._productList.next([JSON.parse(sessionStorage.getItem("cart"))]);      
                   
                })
            } else{
               this.setList.delete(values)               
               sessionStorage.removeItem("cart");
               this._productList.next([null]);  
            }      
           
        })
    }


    private addProductToList(produto: Produto) {

      
        if (!this.setList.has(this.locacao) && !JSON.parse(sessionStorage.getItem("cart"))) {

        

            this.listProduct.quantidade = 1;
            this.listProduct.total += produto.modalidades.map(item => item.preco).reduce((prev, value) => prev + value, 0);

            this.listProduct.produtos.push(produto)
            this.locacao.push(this.listProduct)
            this.setList.add(...[this.locacao]);
            sessionStorage.setItem("cart", JSON.stringify(this.locacao));
            this._productList.next([JSON.parse(sessionStorage.getItem("cart"))]);  

        } else {
            this.locacao = JSON.parse(sessionStorage.getItem("cart"));
            this.setList.add(this.locacao);
            const iterators = this.setList.values();
            const values = iterators.next().value;
            let produ=0;
            let length=0
                    
            values.map((value: ListProduct) => {                
        
                value.produtos.forEach(prd => {     
                          
                    if (String(prd.modalidades[0]._id).localeCompare(produto.modalidades[0]._id) === 0) {                      
                        value.quantidade += 1;
                        value.total += produto.modalidades.map(itm => itm.preco).reduce((prev, value) => prev + value, 0);      
                        sessionStorage.setItem("cart", JSON.stringify(values));
                        this._productList.next([JSON.parse(sessionStorage.getItem("cart"))]);       
                        produ = value.quantidade;    
                    } 
               
                });         

            })
                  
          
            if (length === produ) {                
            
                const novaLista = new ListProduct();
                novaLista.total = 0;
                novaLista.quantidade = 0;                     
                novaLista.produtos = [];

                novaLista.quantidade += 1;
                novaLista.total += produto.modalidades.map(item => item.preco).reduce((prev, value) => prev + value, 0);
        
                novaLista.produtos.push(produto)
                values.push(novaLista)
                
                this.setList.add(...[values]);
                sessionStorage.setItem("cart", JSON.stringify(values));
                this._productList.next([JSON.parse(sessionStorage.getItem("cart"))]);  
            }
        }

    }


}
