import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccomodationListDto } from 'app/modules/admin/pethotels/accommodations/models/accomodationListDto';
import { CustomerDataService } from '../../services/customer-data.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { AccommodationsService } from 'app/core/services/pethotels/accommodations/accommodation.service';

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
    private _customerService: CustomerService,
    private _accommodationrooms: AccommodationsService,
  ) { }

  ngOnInit() {
    this.receivedCustomerId = this._customerDataService.getCustomerId();
  }



  getAccommodationsList() {
    const model = {
      CustomerId: this.receivedCustomerId
    }
    this._accommodationrooms.getAccomodationList(model).subscribe((response) => {
      this.accommodations = response.data;
      this.dataSource = new MatTableDataSource<AccomodationListDto>(
        this.accommodations
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAccommodationsList();
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(date).toLocaleString('tr-TR', options);
}


}
