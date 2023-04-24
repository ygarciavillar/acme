import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'pm-start',
  template: `
   <div class="crop" [title]="rating" [style.width.px]="cropWidth" (click)="onClick()">
     <div style="width: 75px">
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
     </div>
   </div>
  `,
  styles: [`
    .crop {
      overflow: hidden;
    }
    div {
      cursor: pointer;
    }
  `]
})
export class StartComponent implements OnChanges {

  cropWidth  = 75;
  @Input() rating = 0;
  @Output() clickedRating: EventEmitter<string> = new EventEmitter<string> ();
  
  ngOnChanges(){
    this.cropWidth = this.rating * this.cropWidth / 5
  }

  onClick(): void{
   this.clickedRating.emit(`The rating ${this.rating} was clicked!`);
  }


}