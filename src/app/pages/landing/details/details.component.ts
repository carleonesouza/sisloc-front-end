import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'app/pages/admin/products/products.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { CartService } from 'app/pages/cart/cart.service';
import { Produto } from 'app/models/produto';
import { ActivatedRoute } from '@angular/router';
import { Modalidade } from 'app/models/modalidade';
import { Item } from 'app/models/item';
import { PagesService } from 'app/pages/pages.service';


@Component({
  selector: 'datails-loja-home',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],

})
export class DetailsLojaComponent implements OnInit, AfterViewInit {


  @ViewChild('div') div: ElementRef;
  
  yearlyBilling: boolean = true;
  products: any[];
  list: any[] = [];
  descriptions: any[];
  modalidades: Modalidade[];
  itensMod: Item[];
  example = false;
  allItens: [];
  itens$:Observable<any>;
  product$: Observable<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  /**
   * Constructor
   */
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private _pagesService: PagesService,
    private _produtosService: ProductsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void { }


  ngAfterViewInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id);
    }

    this.itens$ = this._pagesService.getItens();

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
        
      });
  }

  addCart(produto, modalidade) {
    const prd = new Produto(produto);
    prd.modalidades = [];
    prd.modalidades.push(modalidade);
    this.cartService.addItem(prd);

  }



  /**
* Track by function for ngFor loops
*
* @param index
* @param item
*/
  trackByFn(index: number, item: any): any {
    return item._id || index;
  }

  trackByFn2(index: number, item: any): any {
    return item._id || index;
  }


}


