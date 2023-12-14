import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-child-route1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-route1.component.html',
  styleUrl: './child-route1.component.css'
})
export class ChildRoute1Component implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // queryParam
  @Input() q! : string;

  // Parent id
  @Input() id!: string;

  ngOnInit(): void {
    // console.log(`q query param is`, this.q);
    console.log('Parent id is:', this.id);
  }

  goToFirstChildren() {
    this.router.navigate(['child-route2'], { relativeTo: this.route.parent });
  }

}
