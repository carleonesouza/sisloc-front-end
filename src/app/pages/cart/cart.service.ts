import { Injectable } from '@angular/core';
import { ListProduct } from 'app/models/carrinho';
import { Produto } from 'app/models/produto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private _productList: BehaviorSubject<ListProduct | null> = new BehaviorSubject(null);

    setList;
    listProduct;
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

    getItems() {

        if (JSON.parse(sessionStorage.getItem("cart"))) {
            const items = JSON.parse(sessionStorage.getItem("cart"));
            return items.produtos;
        }
    }

    getListOfProducts(): Observable<ListProduct> {
        if (JSON.parse(sessionStorage.getItem("cart"))) {
            this._productList.next(JSON.parse(sessionStorage.getItem("cart")));
            return this._productList.asObservable();
        }

    }

    removeItem(produto: Produto) {
        this.listProduct = JSON.parse(sessionStorage.getItem("cart"));
        this.setList.add(this.listProduct);

        this.setList.forEach((item) => {
            item.produtos.map((a: any, index: any) => {
                if (produto.modalidades[0]._id.localeCompare(a.modalidades[0]._id) == 0) {
                    item.produtos.splice(index, 1);
                    this.updateProdutList(item);
                }
            })

        })

    }

    removeAllCart() {

        this.listProduct = []
        sessionStorage.removeItem("cart");
        this._productList.next(this.listProduct);

    }

    total(): number {

        if (JSON.parse(sessionStorage.getItem("cart"))) {
            const cart = JSON.parse(sessionStorage.getItem("cart"));
            return cart.total;
        }
        return 0;
    }

    private addProductToList(produto: Produto) {

        if (!this.setList.has(this.listProduct) && !JSON.parse(sessionStorage.getItem("cart"))) {

            this.listProduct.quantidade = 1;
            this.listProduct.total += produto.modalidades.map(item => item.preco).reduce((prev, value) => prev + value, 0);

            this.listProduct.produtos.push(produto)
            this.setList.add(this.listProduct);
            sessionStorage.setItem("cart", JSON.stringify(this.listProduct));
            this._productList.next(JSON.parse(sessionStorage.getItem("cart")));


        } else {
            this.listProduct = JSON.parse(sessionStorage.getItem("cart"));
            this.setList.add(this.listProduct);
            
            this.setList.forEach((item) => {

                item.quantidade += 1;
                item.total += produto.modalidades.map(item => item.preco).reduce((prev, value) => prev + value, 0);

                item.produtos.push(produto);
                sessionStorage.setItem("cart", JSON.stringify(item));
                this._productList.next(this.listProduct);
                this._productList.next(JSON.parse(sessionStorage.getItem("cart")));
            });

        }

    }


    updateProdutList(list) {

        list.total = 0;
        list.produtos.map((prd) => {
            list.quantidade -= 1;
            list.total += prd.modalidades.map(item => item.preco).reduce((prev, value) => prev + value, 0);
        })
        sessionStorage.setItem("cart", JSON.stringify(list));
        this._productList.next(JSON.parse(sessionStorage.getItem("cart")));
    }

}
