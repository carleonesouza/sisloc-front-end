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
  subtotal;
  desconto = 0;
  taxa = 0;
  total;
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
      this._cartService.getListOfProducts().subscribe((list) => {
        if (list) {
          this.produtos = list.produtos;
          this.subtotal = list.total
          this.total = this.subtotal;
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

  items(): Produto[] {
    return this._cartService.getItems();
  }

  removeItem(produto: Produto) {
    this._cartService.removeItem(produto);
  }

  addCart(produto, modalidade) {
    const prd = new Produto(produto);
    prd.modalidades = [];
    prd.modalidades.push(modalidade);
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

