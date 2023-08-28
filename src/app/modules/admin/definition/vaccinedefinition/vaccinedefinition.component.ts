import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDescriptionsDto } from '../productdescription/models/ProductDescriptionsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-vaccinedefinition',
  templateUrl: './vaccinedefinition.component.html',
  styleUrls: ['./vaccinedefinition.component.css']
})
export class VaccinedefinitionComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'productCode',
    'productBarcode',
    'buyingPrice',
    'sellingPrice',
    'actions'
  ];

@ViewChild(MatPaginator) paginator: MatPaginator;
productdescription: ProductDescriptionsDto[] = [];
dataSource = new MatTableDataSource<ProductDescriptionsDto>(
    this.productdescription
);
isUpdateButtonActive: boolean;

  constructor(   
    private _dialog: MatDialog,
    private _productdescriptionService: ProductDescriptionService,
    private _translocoService: TranslocoService
    ) { }

  ngOnInit() {

  }

}
