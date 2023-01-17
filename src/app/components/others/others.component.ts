import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  color = 'green';
  text: string = 'roma';
  constructor() { }

  ngOnInit(): void {
  }
}
