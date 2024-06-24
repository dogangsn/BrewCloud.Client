"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[4063],{62099:(_,g,s)=>{s.d(g,{S:()=>h});var c=s(51723),r=s(94650),u=s(76717);let h=(()=>{class l{constructor(a){this._httpService=a}getAppointmentTypes(){return this._httpService.getRequest(c.z.appointmenttypes.getAppointmentTypes)}createAppointmentTypes(a){return this._httpService.post(c.z.appointmenttypes.createAppointmentTypes,a)}deleteAppointmentTypes(a){return this._httpService.post(c.z.appointmenttypes.deleteAppointmentTypes,a)}updateAppointmentTypes(a){return this._httpService.post(c.z.appointmenttypes.updateAppointmentTypes,a)}static#t=this.\u0275fac=function(x){return new(x||l)(r.LFG(u.O))};static#e=this.\u0275prov=r.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"})}return l})()},74881:(_,g,s)=>{s.d(g,{W:()=>h});var c=s(51723),r=s(94650),u=s(76717);let h=(()=>{class l{constructor(a){this._httpService=a}getTaxisList(){return this._httpService.getRequest(c.z.taxis.getTaxisList)}createTaxis(a){return this._httpService.post(c.z.taxis.createTaxis,a)}deleteTaxis(a){return this._httpService.post(c.z.taxis.deleteTaxis,a)}updateTaxis(a){return this._httpService.post(c.z.taxis.updateTaxis,a)}static#t=this.\u0275fac=function(x){return new(x||l)(r.LFG(u.O))};static#e=this.\u0275prov=r.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"})}return l})()},24063:(_,g,s)=>{s.r(g),s.d(g,{AppointmenttypesModule:()=>it});var c=s(36895),r=s(30671),u=s(70487),h=s(69079),l=s(45263),d=s(24006),a=s(65412);class x{constructor(m,e,i="",o=!1){this.remark="",this.isDefaultPrice=!1,this.price=m,this.taxisId=e,this.remark=i,this.isDefaultPrice=o}}class R{constructor(m,e,i,o="",p=!1){this.remark="",this.isDefaultPrice=!1,this.id=m,this.price=e,this.taxisId=i,this.remark=o,this.isDefaultPrice=p}}var t=s(94650),b=s(30430),P=s(62099),L=s(74881),y=s(4859),T=s(59549),C=s(284),w=s(84385),N=s(3238),Z=s(56709);function O(n,m){1&n&&(t.TgZ(0,"span"),t._uU(1,"Kasa Tan\u0131m\u0131 Ekle"),t.qZA())}function k(n,m){1&n&&(t.TgZ(0,"span"),t._uU(1,"Kasa Tan\u0131m\u0131 G\xfcncelle"),t.qZA())}function B(n,m){if(1&n&&(t.TgZ(0,"mat-option",24),t._uU(1),t.qZA()),2&n){const e=m.$implicit;t.Q6J("value",e.id),t.xp6(1),t.Oqu(e.taxRatio)}}function Q(n,m){if(1&n&&(t.TgZ(0,"div")(1,"div",10)(2,"div",20)(3,"mat-form-field",12)(4,"mat-label"),t._uU(5,"Fiyat"),t.qZA(),t._UZ(6,"input",13),t.qZA()(),t.TgZ(7,"div",20)(8,"mat-form-field",21)(9,"mat-label"),t._uU(10,"KDV (%)"),t.qZA(),t.TgZ(11,"mat-select",22),t.YNc(12,B,2,2,"mat-option",23),t.qZA()()()()()),2&n){const e=t.oxw();t.xp6(6),t.Q6J("formControlName","price"),t.xp6(5),t.Q6J("formControlName","taxisId")("placeholder","KDV (%)"),t.xp6(1),t.Q6J("ngForOf",e.taxisList)}}let E=(()=>{class n{constructor(e,i,o,p,f,v){this._dialogRef=e,this._formBuilder=i,this._translocoService=o,this._appointmenttypesService=p,this._taxisService=f,this.data=v,this.buttonDisabled=!1,this.showPriceRatio=!1,this.taxisList=[],this.selectedappointmenttypes=v}ngOnInit(){this.getTaxisList(),this.appointmentType=this._formBuilder.group({remark:["",d.kI.required],isDefaultPrice:[!1],price:[0],taxisId:["00000000-0000-0000-0000-000000000000"]}),this.fillFormData(this.selectedappointmenttypes)}fillFormData(e){null!==this.selectedappointmenttypes&&(this.appointmentType.setValue({remark:e.remark,isDefaultPrice:e.isDefaultPrice,price:e.price,taxisId:e.taxisId}),this.togglePriceInput(e.isDefaultPrice))}closeDialog(){this._dialogRef.close({status:null})}addOrUpdateStore(){this.buttonDisabled=!0,this.selectedappointmenttypes?this.updateAppointmentType():this.addAppointmentType()}togglePriceInput(e){this.showPriceRatio=!!e}addAppointmentType(){const e=new x(this.getFormValueByName("price"),this.getFormValueByName("taxisId"),this.getFormValueByName("remark"),this.getFormValueByName("isDefaultPrice"));this._appointmenttypesService.createAppointmentTypes(e).subscribe(i=>{i.isSuccessful?(this.showSweetAlert("success"),this._dialogRef.close({status:!0})):this.showSweetAlert("error")},i=>{console.log(i)})}updateAppointmentType(){const e=new R(this.selectedappointmenttypes.id,this.getFormValueByName("price"),this.getFormValueByName("taxisId"),this.getFormValueByName("remark"),this.getFormValueByName("isDefaultPrice"));this._appointmenttypesService.updateAppointmentTypes(e).subscribe(i=>{i.isSuccessful?(this.showSweetAlert("success"),this._dialogRef.close({status:!0})):this.showSweetAlert("error")},i=>{console.log(i)})}getTaxisList(){this._taxisService.getTaxisList().subscribe(e=>{this.taxisList=e.data})}getFormValueByName(e){return this.appointmentType.get(e).value}showSweetAlert(e){if("success"===e){const i=new u.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),h.p.success);l.m.sweetAlert(i)}else{const i=new u.c(this.translate("sweetalert.error"),this.translate("sweetalert.transactionFailed"),h.p.error);l.m.sweetAlert(i)}}translate(e){return this._translocoService.translate(e)}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(a.so),t.Y36(d.qu),t.Y36(b.Vn),t.Y36(P.S),t.Y36(L.W),t.Y36(a.WI))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-create-edit-appointmenttypes"]],decls:30,vars:11,consts:[["mat-dialog-title","",1,"mat-dialog-title"],[1,"dialog-close-button",3,"tabIndex","click"],[1,"material-icons"],[1,"modalForm"],[1,"modal-header"],[1,"modal-title"],[4,"ngIf"],[1,"modal-body","mbody-productcategory"],[1,"qm-pr-content"],[1,"container-fluid",3,"formGroup"],[1,"row"],[1,"col-sm-12","mt-2","common-width"],[2,"width","100%"],["matInput","",3,"formControlName"],[1,"mb-2",3,"checked","formControlName","color","change"],[1,"flex","flex-col","sm:flex-row","sm:items-center","justify-between","mt-4","sm:mt-6"],[1,"-ml-2"],[1,"flex","items-center","mt-4","sm:mt-0"],["mat-stroked-button","",1,"ml-auto","sm:ml-0",3,"click"],["mat-flat-button","",1,"order-first","sm:order-last",3,"color","disabled","click"],[1,"col-sm-6","mt-2","common-width"],[1,"flex-auto","gt-xs:pl-3"],["name","taxisList",3,"formControlName","placeholder"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(i,o){1&i&&(t.TgZ(0,"h1",0)(1,"button",1),t.NdJ("click",function(){return o.closeDialog()}),t.TgZ(2,"span",2),t._uU(3," highlight_off "),t.qZA()()(),t.TgZ(4,"div",3)(5,"mat-dialog-content")(6,"div",4)(7,"h5",5),t.YNc(8,O,2,0,"span",6),t.YNc(9,k,2,0,"span",6),t.qZA()(),t.TgZ(10,"div",7)(11,"div",8)(12,"div",9)(13,"div",10)(14,"div",11)(15,"mat-form-field",12)(16,"mat-label"),t._uU(17,"Randevu Tipi"),t.qZA(),t._UZ(18,"input",13),t.qZA()(),t.TgZ(19,"div",11)(20,"mat-checkbox",14),t.NdJ("change",function(f){return o.togglePriceInput(f.checked)}),t._uU(21," Varsay\u0131lan Fiyat Ekle "),t.qZA()(),t.YNc(22,Q,13,4,"div",6),t.qZA()()(),t.TgZ(23,"div",15),t._UZ(24,"div",16),t.TgZ(25,"div",17)(26,"button",18),t.NdJ("click",function(){return o.closeDialog()}),t._uU(27," Vazge\xe7 "),t.qZA(),t.TgZ(28,"button",19),t.NdJ("click",function(){return o.addOrUpdateStore()}),t._uU(29," Kaydet "),t.qZA()()()()()()),2&i&&(t.xp6(1),t.Q6J("tabIndex",-1),t.xp6(7),t.Q6J("ngIf",!o.selectedappointmenttypes),t.xp6(1),t.Q6J("ngIf",o.selectedappointmenttypes),t.xp6(3),t.Q6J("formGroup",o.appointmentType),t.xp6(6),t.Q6J("formControlName","remark"),t.xp6(2),t.Q6J("checked",!1)("formControlName","isDefaultPrice")("color","primary"),t.xp6(2),t.Q6J("ngIf",o.showPriceRatio),t.xp6(6),t.Q6J("color","primary")("disabled",o.buttonDisabled))},dependencies:[c.sg,c.O5,d.Fj,d.JJ,d.JL,y.lW,T.KE,T.hX,C.Nt,d.sg,d.u,w.gD,N.ey,Z.oG,a.uh,a.xY]})}return n})();var A=s(97392),I=s(98739),F=s(89299);const Y=["paginator"];function z(n,m){1&n&&(t.TgZ(0,"th",24),t._uU(1," Randevu Tipi "),t.qZA())}function M(n,m){if(1&n&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&n){const e=m.$implicit;t.xp6(1),t.hij(" ",e.remark," ")}}function V(n,m){1&n&&t._UZ(0,"tr",26)}function K(n,m){1&n&&t._UZ(0,"tr",27)}function W(n,m){1&n&&(t.TgZ(0,"th",24),t._uU(1," \u0130\u015flemler "),t.qZA())}function G(n,m){if(1&n){const e=t.EpF();t.TgZ(0,"td",25)(1,"button",28),t.NdJ("click",function(){const p=t.CHM(e).$implicit,f=t.oxw();return t.KtG(f.redirectToUpdate(p.id))}),t.TgZ(2,"mat-icon",29),t._uU(3,"edit"),t.qZA()(),t.TgZ(4,"button",30),t.NdJ("click",function(){const p=t.CHM(e).$implicit,f=t.oxw();return t.KtG(f.redirectToDelete(p.id))}),t.TgZ(5,"mat-icon",31),t._uU(6,"delete"),t.qZA()()()}}const H=function(){return[5,10,20]};let X=(()=>{class n{constructor(e,i,o){this._dialog=e,this._translocoService=i,this._appointmenttypesService=o,this.displayedColumns=["remark","actions"],this.appointmentTypes=[],this.dataSource=new r.by(this.appointmentTypes),this.redirectToUpdate=p=>{this.isUpdateButtonActive=!0;const f=this.appointmentTypes.find(v=>v.id===p);f&&this._dialog.open(E,{maxWidth:"100vw !important",disableClose:!0,data:f}).afterClosed().subscribe(S=>{S.status&&this.getAppointmentTypeList()})},this.redirectToDelete=p=>{const f=new u.c(this.translate("sweetalert.areYouSure"),this.translate("sweetalert.areYouSureDelete"),h.p.warning);l.m.sweetAlertOfQuestion(f).then(v=>{v.isConfirmed&&this._appointmenttypesService.deleteAppointmentTypes({id:p}).subscribe(U=>{if(U.isSuccessful){this.getAppointmentTypeList();const nt=new u.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),h.p.success);l.m.sweetAlert(nt)}else this.showSweetAlert("error",U.errors[0]),console.log(U.errors[0])})})}}ngOnInit(){this.getAppointmentTypeList()}getAppointmentTypeList(){this._appointmenttypesService.getAppointmentTypes().subscribe(e=>{this.appointmentTypes=e.data,this.dataSource=new r.by(this.appointmentTypes),this.dataSource.paginator=this.paginator})}addPanelOpen(){this.isUpdateButtonActive=!1,this._dialog.open(E,{maxWidth:"100vw !important",disableClose:!0,data:null}).afterClosed().subscribe(i=>{i.status&&this.getAppointmentTypeList()})}showSweetAlert(e,i){if("success"===e){const o=new u.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),h.p.success);l.m.sweetAlert(o)}else{const o=new u.c(this.translate("sweetalert.error"),this.translate(i),h.p.error);l.m.sweetAlert(o)}}translate(e){return this._translocoService.translate(e)}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(a.uw),t.Y36(b.Vn),t.Y36(P.S))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-appointmenttypes"]],viewQuery:function(i,o){if(1&i&&t.Gf(Y,5),2&i){let p;t.iGM(p=t.CRH())&&(o.paginator=p.first)}},decls:31,vars:9,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","p-6","pb-22","sm:pt-12","sm:pb-28","sm:px-10","bg-default","dark:bg-transparent"],[1,"flex-1","min-w-0"],[1,"flex","sm:hidden"],[1,"inline-flex","items-center","-ml-1.5","text-secondary","font-medium",3,"routerLink"],[1,"icon-size-5","text-secondary",3,"svgIcon"],[1,"ml-1"],[1,"mt-2"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate"],[1,"font-medium","tracking-tight","text-secondary"],[1,"flex","shrink-0","items-center","mt-6","sm:mt-0","sm:ml-4"],["mat-flat-button","",1,"ml-3",3,"color","click"],[1,"icon-size-5","mr-2",3,"svgIcon"],[1,"flex-auto","-mt-16","p-6","sm:p-10","rounded-t-2xl","shadow","bg-card"],[1,"mat-elevation-z8"],["mat-table","",3,"dataSource"],["matColumnDef","remark"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["matColumnDef","actions"],["showFirstLastButtons","","aria-label","Select page of periodic elements",3,"pageSizeOptions"],["paginator",""],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""],["mat-icon-button","","color","accent",3,"click"],["aria-label","Edit"],["mat-icon-button","","color","warn",3,"click"],[1,"mat-18"]],template:function(i,o){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div")(4,"div",3)(5,"a",4),t._UZ(6,"mat-icon",5),t.TgZ(7,"span",6),t._uU(8,"Back"),t.qZA()()()(),t.TgZ(9,"div",7)(10,"h2",8),t._uU(11," Randevu Tipleri Tan\u0131mlar\u0131 "),t.qZA()(),t.TgZ(12,"div",9),t._uU(13,"M\xfc\u015fteri \xfczerinde randevu i\u015flemlerinde tipleri belirtilmesi "),t.qZA()(),t.TgZ(14,"div",10)(15,"button",11),t.NdJ("click",function(){return o.addPanelOpen()}),t._UZ(16,"mat-icon",12),t._uU(17," Yeni Tip EKle "),t.qZA()()(),t.TgZ(18,"div",13)(19,"div",14)(20,"table",15),t.ynx(21,16),t.YNc(22,z,2,0,"th",17),t.YNc(23,M,2,1,"td",18),t.BQk(),t.YNc(24,V,1,0,"tr",19),t.YNc(25,K,1,0,"tr",20),t.ynx(26,21),t.YNc(27,W,2,0,"th",17),t.YNc(28,G,7,0,"td",18),t.BQk(),t.qZA(),t._UZ(29,"mat-paginator",22,23),t.qZA()()()),2&i&&(t.xp6(5),t.Q6J("routerLink","./.."),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:chevron-left"),t.xp6(9),t.Q6J("color","primary"),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:link"),t.xp6(4),t.Q6J("dataSource",o.dataSource),t.xp6(4),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(4),t.Q6J("pageSizeOptions",t.DdM(8,H)))},dependencies:[y.lW,y.RK,A.Hw,r.BZ,r.fO,r.as,r.w1,r.Dz,r.nj,r.ge,r.ev,r.XQ,r.Gk,I.NW,F.rH]})}return n})();var J=s(85804),D=s(28255),j=s(73162),$=s(96308),q=s(90455),tt=s(10266),et=s(44466);const st=[{path:"",component:X}];let it=(()=>{class n{static#t=this.\u0275fac=function(i){return new(i||n)};static#e=this.\u0275mod=t.oAB({type:n});static#s=this.\u0275inj=t.cJS({imports:[c.ez,d.u5,y.ot,T.lN,A.Ps,C.c,d.u5,d.UX,J.J,D.Tx,d.u5,r.p0,c.ez,A.Ps,T.lN,y.ot,T.lN,A.Ps,C.c,d.u5,d.UX,J.J,D.Tx,w.LD,A.Ps,Z.p9,y.ot,Z.p9,T.lN,A.Ps,C.c,D.Tx,I.TU,j.Cv,N.si,$.JX,w.LD,q.rP,tt.AV,et.m,a.Is,F.Bz.forChild(st)]})}return n})()},70487:(_,g,s)=>{s.d(g,{c:()=>c});class c{constructor(u,h,l){this.title=u,this.text=h,this.icon=l}}}}]);