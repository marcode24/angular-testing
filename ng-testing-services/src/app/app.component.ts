import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const result = calculator.multiply(2, 3);
    const result2 = calculator.divide(2, 0);
  }

}
