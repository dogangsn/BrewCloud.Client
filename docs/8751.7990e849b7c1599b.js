"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[8751],{18751:(ot,Z,o)=>{o.r(Z),o.d(Z,{ServicesModule:()=>tt});var r=o(30671),A=o(69227),p=o(69079),f=o(70487),h=o(45263),t=o(94650),w=o(65412),Q=o(16056),J=o(30430),m=o(4859),d=o(97392),y=o(36895),P=o(98739),U=o(10266),D=o(89299);const F=["paginator"];function z(e,a){1&e&&t._UZ(0,"th",26)}function H(e,a){1&e&&(t.TgZ(0,"mat-icon",29),t._uU(1,"warning"),t.qZA())}function B(e,a){if(1&e&&(t.TgZ(0,"td",27),t.YNc(1,H,2,0,"mat-icon",28),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Q6J("ngIf",0!=i.criticalAmount&&i.stockCount<=i.criticalAmount)}}function I(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1," A\u015f\u0131 Ad\u0131 "),t.qZA())}function L(e,a){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.hij(" ",i.name," ")}}function R(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1," Sat\u0131\u015f Fiyat\u0131 "),t.qZA())}function O(e,a){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.hij(" ",i.sellingPrice," ")}}function M(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1," \u0130\u015flemler "),t.qZA())}function j(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"td",27)(1,"button",30),t.NdJ("click",function(){const n=t.CHM(i).$implicit,l=t.oxw();return t.KtG(l.redirectToUpdate(n.id))}),t.TgZ(2,"mat-icon",31),t._uU(3,"edit"),t.qZA()(),t.TgZ(4,"button",32),t.NdJ("click",function(){const n=t.CHM(i).$implicit,l=t.oxw();return t.KtG(l.redirectToDelete(n.id))}),t.TgZ(5,"mat-icon",33),t._uU(6,"delete"),t.qZA()()()}}function G(e,a){1&e&&t._UZ(0,"tr",34)}function K(e,a){1&e&&t._UZ(0,"tr",35)}const X=function(){return[5,10,20]};let $=(()=>{class e{constructor(i,s,c){this._dialog=i,this._productdescriptionService=s,this._translocoService=c,this.displayedColumns=["warning","name","sellingPrice","actions"],this.productdescription=[],this.dataSource=new r.by(this.productdescription),this.redirectToUpdate=n=>{this.isUpdateButtonActive=!0,this.visibleProductType=!0,this.producttype=3;const l=this.productdescription.find(g=>g.id===n);l&&this._dialog.open(A.i,{maxWidth:"100vw !important",disableClose:!0,data:{selectedProductdescription:l,producttype:3,visibleProductType:!0}}).afterClosed().subscribe(C=>{C.status&&this.getProductList()})},this.redirectToDelete=n=>{const l=new f.c(this.translate("sweetalert.areYouSure"),this.translate("sweetalert.areYouSureDelete"),p.p.warning);h.m.sweetAlertOfQuestion(l).then(S=>{S.isConfirmed&&this._productdescriptionService.deleteProductDescription({id:n}).subscribe(C=>{if(C.isSuccessful){this.getProductList();const et=new f.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),p.p.success);h.m.sweetAlert(et)}else console.error("Silme i\u015flemi ba\u015far\u0131s\u0131z.")})})}}ngAfterViewInit(){this.dataSource.paginator=this.paginator}ngOnInit(){this.getProductList()}getProductList(){this._productdescriptionService.getProductDescriptionFilters({ProductType:3}).subscribe(s=>{this.productdescription=s.data,console.log(this.productdescription),this.dataSource=new r.by(this.productdescription),this.dataSource.paginator=this.paginator})}addPanelOpen(){this.isUpdateButtonActive=!1,this.visibleProductType=!0,this.producttype=3,this._dialog.open(A.i,{maxWidth:"100vw !important",disableClose:!0,data:{selectedProductdescription:null,producttype:3,visibleProductType:!0}}).afterClosed().subscribe(c=>{c.status&&this.getProductList()})}showSweetAlert(i){if("success"===i){const s=new f.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),p.p.success);h.m.sweetAlert(s)}else{const s=new f.c(this.translate("sweetalert.error"),this.translate("sweetalert.transactionFailed"),p.p.error);h.m.sweetAlert(s)}}translate(i){return this._translocoService.translate(i)}toggleActive(i,s){console.log("Toggle event captured for element with id:",i),this._productdescriptionService.updateProductActive({Id:i,Active:s}).subscribe(n=>{n.isSuccessful||this.showSweetAlert("error")},n=>{console.log(n)})}static#t=this.\u0275fac=function(s){return new(s||e)(t.Y36(w.uw),t.Y36(Q.d),t.Y36(J.Vn))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-services"]],viewQuery:function(s,c){if(1&s&&t.Gf(F,5),2&s){let n;t.iGM(n=t.CRH())&&(c.paginator=n.first)}},decls:37,vars:9,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","p-6","pb-22","sm:pt-12","sm:pb-28","sm:px-10","bg-default","dark:bg-transparent"],[1,"flex-1","min-w-0"],[1,"flex","sm:hidden"],[1,"inline-flex","items-center","-ml-1.5","text-secondary","font-medium",3,"routerLink"],[1,"icon-size-5","text-secondary",3,"svgIcon"],[1,"ml-1"],[1,"mt-2"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate"],[1,"font-medium","tracking-tight","text-secondary"],[1,"flex","shrink-0","items-center","mt-6","sm:mt-0","sm:ml-4"],["mat-flat-button","",1,"ml-3",3,"color","click"],[1,"icon-size-5","mr-2",3,"svgIcon"],[1,"flex-auto","-mt-16","p-6","sm:p-10","rounded-t-2xl","shadow","bg-card"],[1,"mat-elevation-z8"],["mat-table","",3,"dataSource"],["matColumnDef","warning"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","sellingPrice"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","","aria-label","Select page of periodic elements",3,"pageSizeOptions"],["paginator",""],["mat-header-cell",""],["mat-cell",""],["color","warn","matTooltip","Kritik sto\u011fa ula\u015f\u0131ld",4,"ngIf"],["color","warn","matTooltip","Kritik sto\u011fa ula\u015f\u0131ld"],["mat-icon-button","","color","accent",3,"click"],["aria-label","Edit"],["mat-icon-button","","color","warn",3,"click"],[1,"mat-18"],["mat-header-row",""],["mat-row",""]],template:function(s,c){1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div")(4,"div",3)(5,"a",4),t._UZ(6,"mat-icon",5),t.TgZ(7,"span",6),t._uU(8,"Back"),t.qZA()()()(),t.TgZ(9,"div",7)(10,"h2",8),t._uU(11," Hizmetler "),t.qZA()(),t.TgZ(12,"div",9),t._uU(13,"Hastaya Uygulanacak Hizmet Tan\u0131malar\u0131n\u0131n Yap\u0131lmas\u0131"),t.qZA()(),t.TgZ(14,"div",10)(15,"button",11),t.NdJ("click",function(){return c.addPanelOpen()}),t._UZ(16,"mat-icon",12),t._uU(17," Yeni Hizmet Ekle "),t.qZA()()(),t.TgZ(18,"div",13)(19,"div",14)(20,"table",15),t.ynx(21,16),t.YNc(22,z,1,0,"th",17),t.YNc(23,B,2,1,"td",18),t.BQk(),t.ynx(24,19),t.YNc(25,I,2,0,"th",17),t.YNc(26,L,2,1,"td",18),t.BQk(),t.ynx(27,20),t.YNc(28,R,2,0,"th",17),t.YNc(29,O,2,1,"td",18),t.BQk(),t.ynx(30,21),t.YNc(31,M,2,0,"th",17),t.YNc(32,j,7,0,"td",18),t.BQk(),t.YNc(33,G,1,0,"tr",22),t.YNc(34,K,1,0,"tr",23),t.qZA(),t._UZ(35,"mat-paginator",24,25),t.qZA()()()),2&s&&(t.xp6(5),t.Q6J("routerLink","./.."),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:chevron-left"),t.xp6(9),t.Q6J("color","primary"),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:plus"),t.xp6(4),t.Q6J("dataSource",c.dataSource),t.xp6(13),t.Q6J("matHeaderRowDef",c.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",c.displayedColumns),t.xp6(1),t.Q6J("pageSizeOptions",t.DdM(8,X)))},dependencies:[m.lW,m.RK,d.Hw,r.BZ,r.fO,r.as,r.w1,r.Dz,r.nj,r.ge,r.ev,r.XQ,r.Gk,y.O5,P.NW,U.gM,D.rH]})}return e})();var u=o(24006),v=o(59549),x=o(284),N=o(85804),T=o(28255),Y=o(84385),b=o(56709),W=o(73162),k=o(3238),E=o(96308),V=o(90455),q=o(44466);const _=[{path:"",component:$}];let tt=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[u.u5,m.ot,v.lN,d.Ps,x.c,u.u5,u.UX,N.J,T.Tx,u.u5,r.p0,y.ez,d.Ps,v.lN,m.ot,v.lN,d.Ps,x.c,u.u5,u.UX,N.J,T.Tx,Y.LD,d.Ps,b.p9,m.ot,b.p9,v.lN,d.Ps,x.c,T.Tx,P.TU,W.Cv,k.si,E.JX,Y.LD,V.rP,U.AV,q.m,w.Is,D.Bz.forChild(_)]})}return e})()}}]);