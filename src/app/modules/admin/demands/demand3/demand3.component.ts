import { Component } from '@angular/core';

export interface TableData {
  name: string;
  age: number;
  city: string;
}

@Component({
  selector: 'app-demand3',
  template: './demand3/demand3.component.html',
  templateUrl: './demand3.component.html', 

})
export class Demand3Component {
  displayedColumns: string[] = ['name', 'age', 'city'];
  dataSource: TableData[] = [
    { name: 'John3', age: 30, city: 'New York3' },
    { name: 'Alice3', age: 25, city: 'London3' },
    { name: 'Bob3', age: 35, city: 'Paris3' },
  ];
}
