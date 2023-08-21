import{ suppliersListDto} from './models/suppliersListDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { TranslocoService } from '@ngneat/transloco';

import { CasingDefinitionService } from 'app/core/services/definition/CasingDefinition/casingdefinition.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { CreateEditSuppliersDialogComponent } from './dialogs/create-edit-suppliers';
import { DeleteCasingDefinitionCommand } from "app/modules/admin/definition/casingdefinition/models/DeleteCasingDefinitionCommand";
import { MatDialog } from '@angular/material/dialog';
import { SuppliersService } from 'app/core/services/suppliers/suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {
  displayedColumns: string[] = ['casename', 'active','update', 'id'];
  suppliers: FormGroup;
    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  suppliersList: suppliersListDto[] = [];
  dataSource = new MatTableDataSource<suppliersListDto>(this.suppliersList);
  
  constructor(
    private _dialog: MatDialog,
    private _suppliersService: SuppliersService,
    private _translocoService: TranslocoService
     ) {}
  
  ngOnInit() {
      //this.getSuppliers();
  }
  isUpdateButtonActive: boolean;

//   getSuppliers() {
//       this._suppliersService.getSuppliersList().subscribe((response) => {
//           this.suppliers = response.data;
//           console.log(this.suppliers);
//       });
//   }
  addPanelOpen(): void {
    //this.erpfinancemonitorForm.reset();
    this.isUpdateButtonActive = false;
    const dialog = this._dialog
        .open(CreateEditSuppliersDialogComponent, {
            maxWidth: '100vw !important',
            disableClose: true,
            data: null,
        })
        .afterClosed()
        .subscribe((response) => {
            if (response.status) {
                //this.getSuppliers();
            }
        });
        
}
}
