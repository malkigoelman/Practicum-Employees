import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {
  selectedColor: string = '#563d7c';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  changeBackgroundColor() {
    // Update the value of the CSS variable --background-color
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.selectedColor);
  }
}
