import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'app/pages/admin/products/products.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import {default as NProgress} from 'nprogress'
import { CartService } from 'app/pages/cart/cart.service';
import { Produto } from 'app/models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { Modalidade } from 'app/models/modalidade';
import { Item } from 'app/models/item';


@Component({
    selector     : 'datails-loja-home',
    templateUrl  : './details.component.html',
    styleUrls    : ['./details.component.scss'],
    
})
export class DetailsLojaComponent implements OnInit {


    yearlyBilling: boolean = true;
    products: any[];
    descriptions: any[];
    modalidades: Modalidade[];
    itens: Item[];
    product$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private cartService: CartService,
        private route: ActivatedRoute,
        private router: Router,
        private _produtosService: ProductsService,
       
    )
    {
    }
   
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id);
    }
        
    
    }

    canDeactivate(): Observable<boolean> {
        this._unsubscribeAll.next(this._produtosService);
        this._unsubscribeAll.complete();
        return of(true);
      }

      getProduct(id: string): void {
        this.product$ = this._produtosService.getProductById(id)
        this.product$
        .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((produto) => {
            this.modalidades = produto.modalidades;
            
            this.modalidades.map((modalidade) =>{
              this.itens= modalidade.itens;
            })
           this.descriptions = produto.descricao.split(",")
            
          });
      }

    addCart(produto: Produto, modalidade){
      const prod = {produto, modalidade}
        NProgress.start()
        this.cartService.addItem(prod)
        NProgress.done()
      }


        /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
        trackByFn(index: number, item: any): any {
            return item.id || index;
        }
    

}


