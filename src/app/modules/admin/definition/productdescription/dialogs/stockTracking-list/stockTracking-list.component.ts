import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { StockTrackingDto } from '../../models/stockTrackingDto';
import { MatTableDataSource } from '@angular/material/table';
import { StockTrackingService } from 'app/core/services/definition/stockTracking/stocktracking.service';

@Component({
  selector: 'app-stockTracking-list',
  templateUrl: './stockTracking-list.component.html',
  styleUrls: ['./stockTracking-list.component.css']
})
export class StockTrackingListComponent implements OnInit {

  displayedColumns: string[] = [
    'processTypeName',
    'supplierName',
    'expirationDateString',
    'purchasePrice',
    'remainingPiece',
    'actions',
  ];

  @ViewChild('paginator') paginator: MatPaginator;
  productdescription: StockTrackingDto[] = [];
  dataSource = new MatTableDataSource<StockTrackingDto>(
    this.productdescription
  );
  productid: string;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _stocktracking: StockTrackingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productid = data.productid;

  }

  ngOnInit() {
    this.getStockTrackingList();
  }

  getStockTrackingList() {
    const model = {
      ProductId: this.productid,
    };
    this._stocktracking
      .getStockTrackingFilterProduct(model)
      .subscribe((response) => {
        this.productdescription = response.data;

        this.dataSource = new MatTableDataSource<StockTrackingDto>(this.productdescription);

        this.dataSource.paginator = this.paginator;
      });
  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

}
