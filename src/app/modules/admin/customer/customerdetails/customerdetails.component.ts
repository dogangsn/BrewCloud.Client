import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'customerdetails',
  templateUrl: './customerdetails.component.html',
})
export class CustomerDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        const customerId = params['id'];
        console.log('Müşteri ID:', customerId);
      });
  }

}
