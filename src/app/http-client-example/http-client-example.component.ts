import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, RicMorCharacter } from '../services/api.service';

@Component({
  selector: 'app-http-client-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <button (click)="prevPage()" [disabled]="!activedPrevButton()">prev page</button>  
      <button (click)="nextPage()" [disabled]="!activedNextButton()">next page</button>
      <button (click)="nextPageV2()" [disabled]="!activedNextButton()">next page v2</button>
    </div>
    <div>
      <h2>Pagination</h2>
      <p>
        {{ pagination() | json }}
      </p>
    </div>
    <div>
      <h2>Data</h2>
      <ul>
      @for (item of resultData(); track item.id ) {
        <li>
          <h4>Title: {{ item.name }}</h4>
          <img width="100em" src="{{ item.image }}">
        </li>

      }
      </ul>
    </div>
  `,
  styles: ``
})
export class HttpClientExampleComponent implements OnInit {

  private apiService = inject(ApiService);
  private readonly httpResponse = this.apiService.httpResult;
  readonly pagination = computed(() => this.httpResponse().info );
  readonly resultData: Signal<RicMorCharacter[]> = computed(() => this.httpResponse().results );
  
  readonly activedPrevButton = computed<boolean>(() => {
    return this.pagination().prev !== null;
  })

  readonly activedNextButton = computed<boolean>(() => {
    return this.pagination().next !== null;
  })

  ngOnInit(): void {
    this.apiService.getMany();
  }

  nextPage() {
    this.apiService.getNextPage();
  }

  nextPageV2() {
    this.apiService.getNextPageWithObserver();
    // this.apiService.getNextPageWithcatchErrorOperator();
  }

  prevPage() {
    this.apiService.getPreviousPage();
  }

}
