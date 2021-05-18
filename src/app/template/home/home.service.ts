import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Home } from './home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'https://5eb9ba733f97140016992030.mockapi.io/vehicle/'

  constructor(private http: HttpClient) {}

  listaCarros(): Observable<any[]> {
    const header = new HttpHeaders().set(
      'Autorization',
      'token' + '1231312aedbcd31fd'  // Token quando a consulta exigir alguma autenticação por header por exemplo. 
    );

    return this.http.get<any>(this.url, { headers: header })
  }

  listaPagCarros(num: number): Observable<any[]> {
    const header = new HttpHeaders().set(
      'Autorization',
      'token' + '1231312aedbcd31fd'  // Token quando a consulta exigir alguma autenticação por header por exemplo. 
    );

    return this.http.get<any>(this.url+"?page="+num+"&limit=10", { headers: header })
  }

  searchPlate(plate: string) {
    const header = new HttpHeaders().set(
      'Autorization',
      'token' + '1231312aedbcd31fd'  // Token quando a consulta exigir alguma autenticação por header por exemplo. 
    );

    if(plate == "0"){
      return this.http.get<any>(this.url, { headers: header })
    }else{
      return this.http.get<any>(this.url+"?filter="+plate, { headers: header })  
    }

  }

  novoCarro(novocarro: Home): Observable<Home> {
    const header = new HttpHeaders().set(
      'Autorization',
      'token' + '1231312aedbcd31fd'  // Token quando a consulta exigir alguma autenticação por header por exemplo. 
    );

    return this.http.post<Home>(this.url, novocarro, { headers: header});
  }


  editaCarro(id: string):Observable<any[]> {
    const header = new HttpHeaders().set(
      'Autorization',
      'token' + '1231312aedbcd31fd'  // Token quando a consulta exigir alguma autenticação por header por exemplo. 
    );

    return this.http.get<any>(this.url+":"+id, { headers: header })
  }

  delCar(id: string): Observable<any> {
    const header = new HttpHeaders().set(
      'Autorization',
      'token' + '1231312aedbcd31fd'  // Token quando a consulta exigir alguma autenticação por header por exemplo. 
    );

    return this.http.delete(this.url+":"+id, { headers: header });
  }


}

export class HomeServiceComponents {

  private matches = new ReplaySubject<boolean>(1);
  public match$ = this.matches.asObservable();

  constructor(public readonly query: string) {
    if (window) {
      const mediaQueryList = window.matchMedia(this.query);
      const listener = event => this.matches.next(event.matches);
      listener(mediaQueryList);
      mediaQueryList.addEventListener('change', listener);
    }
  }
}