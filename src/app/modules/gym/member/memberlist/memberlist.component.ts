import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MemberListDto } from '../models/memberlistDto';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from 'app/core/services/gym/member/member.service';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {

  displayedColumns: string[] = ['recId', 'firstName', 'lastName', 'phoneNumber', 'phoneNumber2', 'eMail', 'note', 'balance', 'actions'];
  @ViewChild('paginator') paginator: MatPaginator;
  memberlist: MemberListDto[] = [];
  dataSource = new MatTableDataSource<MemberListDto>(this.memberlist);
  loader = true;

  constructor(
    private _memberService: MemberService
  ) { }

  ngOnInit() {
    this.getMemberList();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getMemberList() {

    this._memberService.getMemberList().subscribe((response) => {

      this.memberlist = response.data;
      this.dataSource = new MatTableDataSource<MemberListDto>(
        this.memberlist
      );
      setTimeout(() => {
        if (this.dataSource) {
          this.dataSource.paginator = this.paginator;
        }
      }, 0);
      this.loader = false;
    });
  }

}
