import { CasingDefinitionService } from 'app/core/services/definition/CasingDefinition/casingdefinition.service';
import { casingDefinitionListDto } from './models/casingDefinitionListDto';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-casingdefinition',
  templateUrl: './casingdefinition.component.html',
  styleUrls: ['./casingdefinition.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CasingdefinitionComponent {
  displayedColumns: string[] = ['Kasa', 'Durum'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  casingcards: casingDefinitionListDto[] = [];
  dataSource = new MatTableDataSource<casingDefinitionListDto>(this.casingcards);
  
  constructor(private _casingdefinitionService: CasingDefinitionService) {}
  
  ngOnInit() {
      this.getCasingDefinition();
  }
  
  getCasingDefinition() {
      this._casingdefinitionService.getCasingDefinitionList().subscribe((response) => {
          this.casingcards = response.data;
          console.log(this.casingcards);
      });
  }
  
}
