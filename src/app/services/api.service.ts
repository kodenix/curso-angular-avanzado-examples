import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Observable, Observer, Subscriber, Subscription, catchError, map, of, tap,  } from 'rxjs';

export interface RicMorCharacter {
  id: number;
  name: string; 
  status: string; 
  species: string;
  image: string;
  url: string;
}

export interface RicMorPagination { 
  count: number; 
  pages: number; 
  next: string; 
  prev: string 
}

export interface RicMorHttpResponse {
  info: RicMorPagination,
  results: RicMorCharacter[]
}

const initState: RicMorHttpResponse = {
  info: { count: 0, pages: 0, next: '', prev: '' },
  results: []
}

interface UrlApiSchema {
  page: number;
  urlbase: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpClient = inject(HttpClient)
  private urlApi = signal('https://rickandmortyapi.com/api/character');
  
  //private getMany$: Observable<RicMorHttpResponse> = .pipe();
  private getManySubscription!: Subscription;

  private readonly mutableHttpResult = signal<RicMorHttpResponse>(
    {
      info: {count:0, pages: 0, next:'', prev: ''},
      results: []
    }
  )

  readonly httpResult = this.mutableHttpResult.asReadonly();

  private readonly observerV1: Observer<RicMorHttpResponse> = {
    next: (data) => {
      //this.mutableHttpResult.set(data);
      console.log(data);
    },
    error: (error) => {
      //console.error("Error loading data", error);
      console.log("Aqui entro el error");
    },
    complete: () => {
      console.log("Request complete successfuly")
    } 
  }

  getMany(): void {
    this.unsubscribe(this.getManySubscription);
    this.getManySubscription = this.callHttpRequest(this.urlApi()).subscribe(res => {
      this.mutableHttpResult.set(res);
    });
  }

  getNextPage() {
    this.unsubscribe(this.getManySubscription);
    const nextUrl = this.httpResult().info.next;
    this.getManySubscription = this.callHttpRequest(nextUrl).subscribe(res => {
      this.mutableHttpResult.set(res);
    });
  }

  getNextPageWithObserver() {
    this.unsubscribe(this.getManySubscription);
    // const nextUrl = this.httpResult().info.next;
    const nextUrl = 'http://localhost:3000/charactersss'
    this.getManySubscription = this.callHttpRequest(nextUrl).subscribe(this.observerV1);
  }

  getNextPageWithcatchErrorOperator() {
    this.unsubscribe(this.getManySubscription);
    // const nextUrl = this.httpResult().info.next;
    const nextUrl = 'http://localhost:3000/charactersss'
    this.getManySubscription = this.callHttpRequest(nextUrl).pipe(catchError((error) => {
      console.log('Aqui detectamos el error.......')
      return of(null)
    })).subscribe(res => {
      // Validamos si res es null o no para tratarlo como respuesta o error
      if (res) {
        this.mutableHttpResult.set(res);
      } else {
        console.log('se trato un error')
      }
      
    })
  }

  getPreviousPage() {
    this.unsubscribe(this.getManySubscription);
    const prevUrl = this.httpResult().info.prev;
    this.getManySubscription = this.callHttpRequest(prevUrl).subscribe(res => {
      this.mutableHttpResult.set(res);
    });
  }

  private callHttpRequest(urlApi: string): Observable<RicMorHttpResponse> {
    return this.httpClient.get<RicMorHttpResponse>(urlApi);
  }

  unsubscribe(subs: Subscription) {
    if (subs) {
      subs.unsubscribe();
    }
  }

}
