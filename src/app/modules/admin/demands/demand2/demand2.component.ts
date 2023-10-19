import { Component } from '@angular/core';

export interface TableData {
  name: string;
  age: number;
  city: string;
}

@Component({
  selector: 'app-demand2',
  template: './demand2/demand2.component.html',
  templateUrl: './demand2.component.html', 

})
export class Demand2Component {
  displayedColumns: string[] = ['name', 'age', 'city'];
  dataSource: TableData[] = [
    { name: 'John2', age: 30, city: 'New York2' },
    { name: 'Alice2', age: 25, city: 'London2' },
    { name: 'Bob2', age: 35, city: 'Paris2' },
  ];
}
