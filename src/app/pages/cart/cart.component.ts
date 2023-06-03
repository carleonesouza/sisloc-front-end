import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from 'app/models/produto';
import { CartService } from './cart.service';
import { default as swal } from 'sweetalert2'
import { default as NProgress } from 'nprogress'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, map, merge, switchMap, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ListProduct } from 'app/models/carrinho';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild('selectedProductForm') selectedtForm: NgForm;
  produtos$: Observable<any>;
  produtos: Produto[];
  flashMessage: 'success' | 'error' | null = null;
  isLoading: boolean = false;
  subtotal=0;
  locacoes$: Observable<any>;
  locacoes: [];
  desconto = 0;
  quantidade;
  taxa = 0;
  total=0;
  selectedProduct: null = null;
  selectedProductForm: FormGroup;

  tagsEditMode: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
  ) {
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    let cartSession = sessionStorage.getItem("cart");
    //carrinho não está vazio
    if (cartSession != null) {
      this.locacoes$ =  this._cartService.getListOfProducts();
      this.locacoes$.subscribe((list) =>{   
  
        if(list[0] !== null){         
          this.locacoes = list;
           this.locacoes.forEach((element: []) =>{
            this.subtotal = 0;           
             this.subtotal += element.map((item: ListProduct)=> item.total).reduce((prev, total) => prev + total, 0);
              this.total = this.subtotal;                  
           
          }) 
                      
        }else{
          this.locacoes = null;
          this.subtotal=0;
          this.total = 0;  
        }
          
       
      })
      
    }
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  createField() {
    this.selectedProductForm = new FormGroup({
      produto: new FormControl(),
      quantidade: new FormControl([]),
    })
  }


  removeItem(produto: Produto) {
    this._cartService.removeItem(produto);
  }

  addCart(produto) {
    const prd = new Produto(produto);  
    this._cartService.addItem(prd);
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

