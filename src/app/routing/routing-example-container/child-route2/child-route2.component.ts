import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-child-route2',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './child-route2.component.html',
  styleUrl: './child-route2.component.css'
})
export class ChildRoute2Component {

}
