import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'app/pages/admin/products/products.service';
import { Observable, Subject, switchMap, take, takeUntil } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements  OnInit
{

  searchInputControl: FormControl = new FormControl();
  products: any[];
  descriptions: any[];
  products$: Observable<any[]>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  /**
   * Constructor
   */
  constructor(private _produtosService: ProductsService)
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
      this.products$ = this._produtosService.getAllProducts();
      this.products$
      .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((result) => {
          this.products = result;
          this.products.map((produto)=>{
              this.descriptions = produto.descricao.split(",")
          });
        });

        this.searchInputControl.valueChanges
        .pipe(
            takeUntil(this._unsubscribeAll),
            switchMap(query =>

                // Search
                this.products$ = this._produtosService.searchProduct(query)
            )
        )
        .subscribe((result) =>{
          this.products = result;
            this.products.map((produto)=>{
                this.descriptions = produto.descricao.split(",")
            });
        });

  }

  searchItem(event) {  
    if (event.target.value !== '' && event.target.valeu !== null && event.target.value !== undefined) {
      this.products$.pipe(
        take(1),
        takeUntil(this._unsubscribeAll),
        switchMap(() =>           
        this._produtosService.searchProduct(event.target.value)
        )
      ).subscribe((result) =>{
        console.log(result)
        this.products = result;
          this.products.map((produto)=>{
              this.descriptions = produto.descricao.split(",")
          });
      });
    }
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


