import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HandleError } from 'app/utils/handleErrors';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private _modalidades: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _modalidade: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _itens: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _item: BehaviorSubject<any | null> = new BehaviorSubject(null);



  constructor(private _httpClient: HttpClient,private error: HandleError ) { }


  get modalidades$(): Observable<any[]> {
    return this._modalidades.asObservable();
  }

  get modalidade$(): Observable<any> {
    return this._modalidade.asObservable();
  }

  get itens$(): Observable<any[]> {
    return this._itens.asObservable();
  }

  get item$(): Observable<any> {
    return this._item.asObservable();
  }


  getAllModalidades() {
    return this._httpClient.get<any[]>(environment.apiManager + 'modalidades')
      .pipe(
        tap((modalidades) => {       
          this._modalidades.next(modalidades);
        }),
        catchError(this.error.handleError<any[]>('getAllProducts'))
      );
  }

  getItens() {
    return this._httpClient.get<any[]>(environment.apiManager + 'itens')
      .pipe(
        tap((itens) => {       
          this._itens.next(itens);
        }),
        catchError(this.error.handleError<any[]>('getItens'))
      );
  }


  getModalidadeById(id): Observable<any> {
      return this._httpClient.get<any>(environment.apiManager + 'modalidades/'+id)
      .pipe(
        tap((modalidade) => {
          this._modalidade.next(modalidade);
        }),
        catchError(this.error.handleError<any>('getProductById'))
      );
  }

}
