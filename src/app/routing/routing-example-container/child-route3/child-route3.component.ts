import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-route3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      child-route3 works!
    </p>
  `,
  styles: ``
})
export class ChildRoute3Component {

}
