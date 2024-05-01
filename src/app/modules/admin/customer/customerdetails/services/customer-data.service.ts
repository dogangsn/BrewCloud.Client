// customer-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  customerId: string;

  constructor() { }

  setCustomerId(id: string) {
    this.customerId = id;
  }

  getCustomerId() {
    return this.customerId;
  }
}
