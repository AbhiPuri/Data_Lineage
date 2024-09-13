import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-loader',
  templateUrl: './tree-loader.component.html',
  styleUrl: './tree-loader.component.css'
})
export class TreeLoaderComponent implements OnInit {
  @Input() showBox: boolean = false;

  ngOnInit() {
    console.log(this.showBox)
  }
}
