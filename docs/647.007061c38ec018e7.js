"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[647],{647:(st,y,i)=>{i.r(y),i.d(y,{ProductdescriptionModule:()=>u});var A=i(9299),a=i(4006),D=i(9227),s=i(671),g=i(9079),C=i(5263),v=i(487),t=i(4650),U=i(5412),Y=i(6056),Q=i(5707),m=i(4859),l=i(7392),w=i(8739);const B=["paginator"];function b(e,o){1&e&&(t.TgZ(0,"th",28),t._uU(1," \xdcr\xfcn Ad\u0131. "),t.qZA())}function J(e,o){if(1&e&&(t.TgZ(0,"td",29),t._uU(1),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.hij(" ",n.name," ")}}function L(e,o){1&e&&(t.TgZ(0,"th",28),t._uU(1," \xdcr\xfcn Kodu "),t.qZA())}function z(e,o){if(1&e&&(t.TgZ(0,"td",29),t._uU(1),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.hij(" ",n.productCode," ")}}function R(e,o){1&e&&(t.TgZ(0,"th",28),t._uU(1," \xdcr\xfcn Barkodu "),t.qZA())}function j(e,o){if(1&e&&(t.TgZ(0,"td",29),t._uU(1),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.hij(" ",n.productBarcode," ")}}function H(e,o){1&e&&(t.TgZ(0,"th",28),t._uU(1," Al\u0131\u015f Fiyat\u0131 "),t.qZA())}function M(e,o){if(1&e&&(t.TgZ(0,"td",29),t._uU(1),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.hij(" ",n.buyingPrice," ")}}function I(e,o){1&e&&(t.TgZ(0,"th",28),t._uU(1," Sat\u0131\u015f Fiyat\u0131 "),t.qZA())}function O(e,o){if(1&e&&(t.TgZ(0,"td",29),t._uU(1),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.hij(" ",n.sellingPrice," ")}}function $(e,o){1&e&&(t.TgZ(0,"th",28),t._uU(1," \u0130\u015flemler "),t.qZA())}function G(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"td",29)(1,"button",30),t.NdJ("click",function(){const r=t.CHM(n).$implicit,d=t.oxw();return t.KtG(d.redirectToUpdate(r.id))}),t.TgZ(2,"mat-icon",31),t._uU(3,"edit"),t.qZA()(),t.TgZ(4,"button",32),t.NdJ("click",function(){const r=t.CHM(n).$implicit,d=t.oxw();return t.KtG(d.redirectToDelete(r.id))}),t.TgZ(5,"mat-icon",33),t._uU(6,"delete"),t.qZA()()()}}function X(e,o){1&e&&t._UZ(0,"tr",34)}function K(e,o){1&e&&t._UZ(0,"tr",35)}const W=function(){return[5,10,20]};class p{constructor(o,n,c){this._dialog=o,this._productdescriptionService=n,this._translocoService=c,this.displayedColumns=["name","productCode","productBarcode","buyingPrice","sellingPrice","actions"],this.productdescription=[],this.dataSource=new s.by(this.productdescription),this.redirectToUpdate=f=>{this.isUpdateButtonActive=!0,this.visibleProductType=!1,this.producttype=1;const r=this.productdescription.find(P=>P.id===f);r&&this._dialog.open(D.i,{maxWidth:"100vw !important",disableClose:!0,data:{selectedProductdescription:r,producttype:1,visibleProductType:!1}}).afterClosed().subscribe(h=>{h.status&&this.getProductList()})},this.redirectToDelete=f=>{const r=new v.c(this.translate("sweetalert.areYouSure"),this.translate("sweetalert.areYouSureDelete"),g.p.warning);C.m.sweetAlertOfQuestion(r).then(d=>{d.isConfirmed&&this._productdescriptionService.deleteProductDescription({id:f}).subscribe(h=>{if(h.isSuccessful){this.getProductList();const nt=new v.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),g.p.success);C.m.sweetAlert(nt)}else this.showSweetAlert("error",h.errors[0]),console.log(h.errors[0])})})}}ngAfterViewInit(){this.dataSource.paginator=this.paginator}ngOnInit(){this.getProductList()}getProductList(){this._productdescriptionService.getProductDescriptionFilters({ProductType:1}).subscribe(n=>{this.productdescription=n.data,console.log(this.productdescription),this.dataSource=new s.by(this.productdescription),this.dataSource.paginator=this.paginator})}addPanelOpen(){this.isUpdateButtonActive=!1,this.visibleProductType=!1,this.producttype=1,this._dialog.open(D.i,{maxWidth:"100vw !important",disableClose:!0,data:{selectedProductdescription:null,producttype:1,visibleProductType:!1}}).afterClosed().subscribe(c=>{c.status&&this.getProductList()})}showSweetAlert(o,n){if("success"===o){const c=new v.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),g.p.success);C.m.sweetAlert(c)}else{const c=new v.c(this.translate("sweetalert.error"),this.translate(n),g.p.error);C.m.sweetAlert(c)}}translate(o){return this._translocoService.translate(o)}}p.\u0275fac=function(o){return new(o||p)(t.Y36(U.uw),t.Y36(Y.d),t.Y36(Q.Vn))},p.\u0275cmp=t.Xpm({type:p,selectors:[["app-productdescription"]],viewQuery:function(o,n){if(1&o&&t.Gf(B,5),2&o){let c;t.iGM(c=t.CRH())&&(n.paginator=c.first)}},decls:43,vars:9,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","p-6","pb-22","sm:pt-12","sm:pb-28","sm:px-10","bg-default","dark:bg-transparent"],[1,"flex-1","min-w-0"],[1,"flex","sm:hidden"],[1,"inline-flex","items-center","-ml-1.5","text-secondary","font-medium",3,"routerLink"],[1,"icon-size-5","text-secondary",3,"svgIcon"],[1,"ml-1"],[1,"mt-2"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate"],[1,"font-medium","tracking-tight","text-secondary"],[1,"flex","shrink-0","items-center","mt-6","sm:mt-0","sm:ml-4"],["mat-flat-button","",1,"ml-3",3,"color","click"],[1,"icon-size-5","mr-2",3,"svgIcon"],[1,"flex-auto","-mt-16","p-6","sm:p-10","rounded-t-2xl","shadow","bg-card"],[1,"mat-elevation-z8"],["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","productCode"],["matColumnDef","productBarcode"],["matColumnDef","buyingPrice"],["matColumnDef","sellingPrice"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","","aria-label","Select page of periodic elements",3,"pageSizeOptions"],["paginator",""],["mat-header-cell",""],["mat-cell",""],["mat-icon-button","","color","accent",3,"click"],["aria-label","Edit"],["mat-icon-button","","color","warn",3,"click"],[1,"mat-18"],["mat-header-row",""],["mat-row",""]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div")(4,"div",3)(5,"a",4),t._UZ(6,"mat-icon",5),t.TgZ(7,"span",6),t._uU(8,"Back"),t.qZA()()()(),t.TgZ(9,"div",7)(10,"h2",8),t._uU(11," \xdcr\xfcn "),t.qZA()(),t.TgZ(12,"div",9),t._uU(13,"Malzeme Listesi/ Sat\u0131\u015fa sunulacak \xfcr\xfcnlerin tan\u0131mlamas\u0131n\u0131n yap\u0131lmas\u0131"),t.qZA()(),t.TgZ(14,"div",10)(15,"button",11),t.NdJ("click",function(){return n.addPanelOpen()}),t._UZ(16,"mat-icon",12),t._uU(17," Yeni \xdcr\xfcn Ekle "),t.qZA()()(),t.TgZ(18,"div",13)(19,"div",14)(20,"table",15),t.ynx(21,16),t.YNc(22,b,2,0,"th",17),t.YNc(23,J,2,1,"td",18),t.BQk(),t.ynx(24,19),t.YNc(25,L,2,0,"th",17),t.YNc(26,z,2,1,"td",18),t.BQk(),t.ynx(27,20),t.YNc(28,R,2,0,"th",17),t.YNc(29,j,2,1,"td",18),t.BQk(),t.ynx(30,21),t.YNc(31,H,2,0,"th",17),t.YNc(32,M,2,1,"td",18),t.BQk(),t.ynx(33,22),t.YNc(34,I,2,0,"th",17),t.YNc(35,O,2,1,"td",18),t.BQk(),t.ynx(36,23),t.YNc(37,$,2,0,"th",17),t.YNc(38,G,7,0,"td",18),t.BQk(),t.YNc(39,X,1,0,"tr",24),t.YNc(40,K,1,0,"tr",25),t.qZA(),t._UZ(41,"mat-paginator",26,27),t.qZA()()()),2&o&&(t.xp6(5),t.Q6J("routerLink","./.."),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:chevron-left"),t.xp6(9),t.Q6J("color","primary"),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:pencil-alt"),t.xp6(4),t.Q6J("dataSource",n.dataSource),t.xp6(19),t.Q6J("matHeaderRowDef",n.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",n.displayedColumns),t.xp6(1),t.Q6J("pageSizeOptions",t.DdM(8,W)))},dependencies:[m.lW,m.RK,l.Hw,s.BZ,s.fO,s.as,s.w1,s.Dz,s.nj,s.ge,s.ev,s.XQ,s.Gk,w.NW,A.rH]});var x=i(9549),T=i(284),S=i(5804),Z=i(8255),E=i(6895),N=i(4385),F=i(6709),V=i(3162),k=i(3238),q=i(6308),_=i(455),tt=i(266),et=i(4466),ot=i(6838);const it=[{path:"",component:p}];class u{}u.\u0275fac=function(o){return new(o||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[a.u5,m.ot,x.lN,l.Ps,T.c,a.u5,a.UX,S.J,Z.Tx,a.u5,s.p0,E.ez,l.Ps,x.lN,m.ot,x.lN,l.Ps,T.c,a.u5,a.UX,S.J,Z.Tx,N.LD,l.Ps,F.p9,m.ot,F.p9,x.lN,l.Ps,T.c,Z.Tx,w.TU,V.Cv,k.si,q.JX,N.LD,_.rP,tt.AV,et.m,U.Is,ot.FF,A.Bz.forChild(it)]})}}]);