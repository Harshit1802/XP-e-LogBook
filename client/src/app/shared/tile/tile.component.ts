import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.less']
})
export class TileComponent implements OnInit {
  @Input() title: string='';
  @Input() count: string='';
  @Input() isSelected: boolean=false;
  @Input() isClickable: boolean = false;
  @Output() tileClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onTileClick() {
    this.tileClick.emit();
  }
}
