import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent {
  isHovering: boolean = false;

  showSettings() {
    console.log("1");
    this.isHovering = true;
  }

  hideSettings() {
    console.log("2");
    this.isHovering = false;
  }
}
