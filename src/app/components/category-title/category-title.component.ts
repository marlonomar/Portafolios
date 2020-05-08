import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-category-title',
  templateUrl: './category-title.component.html',
  styleUrls: ['./category-title.component.less']
})
export class CategoryTitleComponent implements OnInit {
  @Input() public title: string;
  @Input() public subtitle: string;
  @Input() public contrast: string;

  constructor() { }

  ngOnInit() {
  }

}
