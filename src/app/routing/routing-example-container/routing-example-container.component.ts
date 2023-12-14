import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, OutletContext, ParamMap, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-routing-example-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './routing-example-container.component.html',
  styleUrl: './routing-example-container.component.css'
})
export class RoutingExampleContainerComponent implements OnInit {

  active = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private queryParam$ = this.route.queryParamMap.pipe(
    map(params => params.getAll('q')),
  );
  private idPathParam$ = this.route.paramMap.pipe(
    map(params => params.get('id')),
  );

  currentId!: number;

  @Input()
  set id(idParam: string) {
    this.currentId = parseInt(idParam);
  }

  @Input() currentTitle?: string;

  ngOnInit(): void {
    this.queryParam$.subscribe(queryParamValue => { console.log('q query ParamValue are ', queryParamValue)});
    this.idPathParam$.subscribe(idPathParamValue => { console.log('id path ParamValue is ', idPathParamValue)});
    // this.router.tit
  }

  openPopup() {
    this.router.navigate([{ outlets: { popup: ['path-popup']}}], { relativeTo: this.route });
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: {popup: null}}], { relativeTo: this.route });
  }

  popupActivado() {
    console.log('popup activado');
    this.active = true;
  }

  popupDesactivado() {
    console.log('popup desactivado');
    this.active = false;
  }

  popupDesatachado() {
    console.log('popup desatachado');
  }

  isInactive() {
    return this.active !== true;
  }

}
