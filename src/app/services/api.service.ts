import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Observable, Subscriber, Subscription, map, tap,  } from 'rxjs';

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

  getMany() {
    if (this.getManySubscription) {
      this.getManySubscription.unsubscribe();
    }
    
    this.getManySubscription = this.httpClient.get<RicMorHttpResponse>(this.urlApi()).subscribe(res => {
      this.mutableHttpResult.set(res);
    })
  }

  getNextPage() {
    const nextUrl = this.httpResult().info.next;
    this.callHttpRequest(nextUrl);
  }

  getPreviousPage() {
    const prevUrl = this.httpResult().info.prev;
    this.callHttpRequest(prevUrl);
    
  }

  private callHttpRequest(urlApi: string) {
    this.getManySubscription.unsubscribe();
    this.getManySubscription = this.httpClient.get<RicMorHttpResponse>(urlApi).subscribe(res => {
      console.log('llamada next');
      this.mutableHttpResult.set(res);
    })
  }

}
