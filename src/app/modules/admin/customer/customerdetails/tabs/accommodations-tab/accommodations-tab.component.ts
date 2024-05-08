import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccomodationListDto } from 'app/modules/admin/pethotels/accommodations/models/accomodationListDto';
import { CustomerDataService } from '../../services/customer-data.service';
import { CustomerService } from 'app/core/services/customers/customers.service';

@Component({
  selector: 'app-accommodations-tab',
  templateUrl: './accommodations-tab.component.html',
  styleUrls: ['./accommodations-tab.component.css']
})
export class AccommodationsTabComponent implements OnInit {
  
  displayedColumns: string[] = ['customerName', 'roomName', 'checkinDate', 'checkOutDate', 'actions'];

  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  accommodations: AccomodationListDto[] = [];
  dataSource = new MatTableDataSource<AccomodationListDto>(this.accommodations);
  receivedCustomerId: string;

  constructor(
    private _customerDataService: CustomerDataService,
    private _customerService: CustomerService
  ) { }

  ngOnInit() {
    this.receivedCustomerId = this._customerDataService.getCustomerId(); 
  }

}
