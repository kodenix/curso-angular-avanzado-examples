import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-route1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-route1.component.html',
  styleUrl: './child-route1.component.css'
})
export class ChildRoute1Component implements OnInit {
  
  // queryParam
  @Input() q! : string;
  
  // Parent id
  @Input() id!: string;

  ngOnInit(): void {
    // console.log(`q query param is`, this.q);
    console.log('Parent id is:', this.id);
  }

}
