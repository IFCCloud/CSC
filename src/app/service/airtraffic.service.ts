import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirtrafficService {

  constructor(private http : HttpClient) { }

  sendItems(company : string, content : any) : Observable<any> {
    let apiUrl = environment.fusionUrl + '/generic/config/items';
    console.log('Sending to ... ' + apiUrl);

    return this.http.post(apiUrl, content, {headers : this.setRequestHeaders(company) }).pipe(
      tap(res => this.handleResponse(res)),
      catchError(this.handleError('sendItems', { status : "Bad" } ))
    );
  }


  getItem(company : string, item : string) : Observable<any> {

    let apiUrl = environment.fusionUrl + '/generic/config/items?item=' + item;
    return this.http.get(apiUrl,  {headers : this.setRequestHeaders(company) }).pipe(
      tap(_ => this.log(`Item Retrieved.`)),
      catchError(this.handleError('getItem',[]))
    );
  }

  getItemUOM(company : string, item : string) : Observable<any> {

    let apiUrl = environment.fusionUrl + '/generic/config/items/uoms?item=' + item;
    return this.http.get(apiUrl,  {headers : this.setRequestHeaders(company) }).pipe(
      tap(_ => this.log(`Item UOM Retrieved.`)),
      catchError(this.handleError('getItemUOM',[]))
    );
  }

  getItemCrossRef(company : string, item : string) : Observable<any> {

    let apiUrl = environment.fusionUrl + '/generic/config/items/itemCrossReference?item=' + item;
    return this.http.get(apiUrl,  {headers : this.setRequestHeaders(company) }).pipe(
      tap(_ => this.log(`Item Cross Reference Retrieved.`)),
      catchError(this.handleError('getItemCrossRef',[]))
    );
  }

  private setRequestHeaders(company : string) : HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Credentials':'true',
	    'Access-Control-Allow-Headers':'Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type',
      'Access-Control-Allow-Origins': '*',
      'Company': company,
      'SCVER' : environment.version,
      'API-Key' : environment.apikey
    });

    return headers;
  }



  private log(message:string) {
    console.log('Items - ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //TODO
      console.log('Something went wrong, do something here ...' + error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private handleResponse (response? : any) : Observable<any> {
      response["status"] = "Ok";
      return (response );
  }

}
