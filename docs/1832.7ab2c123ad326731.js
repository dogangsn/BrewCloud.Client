"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[1832],{57156:(b,v,i)=>{i.d(v,{d:()=>p});var h=i(51723),a=i(94650),l=i(76717);let p=(()=>{class m{constructor(d){this._httpService=d}getStoreList(){return this._httpService.getRequest(h.z.store.storeList)}createStores(d){return this._httpService.post(h.z.store.createStore,d)}deletedStores(d){return this._httpService.post(h.z.store.deleteStore,d)}updateStores(d){return this._httpService.post(h.z.store.updateStore,d)}static#t=this.\u0275fac=function(_){return new(_||m)(a.LFG(l.O))};static#e=this.\u0275prov=a.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})}return m})()},31832:(b,v,i)=>{i.r(v),i.d(v,{StoreModule:()=>nt});var h=i(89299),a=i(24006),l=i(30671),p=i(65412),m=i(70487),S=i(45263),d=i(69079);class _{constructor(r,s,o){this.depotCode=r,this.depotName=s,this.active=o}}class Y{constructor(r,s,o,n){this.id=r,this.depotCode=s,this.depotName=o,this.active=n}}var t=i(94650),N=i(30430),U=i(57156),f=i(4859),C=i(59549),g=i(97392),Z=i(284),T=i(36895),A=i(56709);function B(e,r){1&e&&(t.TgZ(0,"span"),t._uU(1,"Depo G\xfcncelle"),t.qZA())}function E(e,r){1&e&&(t.TgZ(0,"span"),t._uU(1,"Depo Ekle"),t.qZA())}let y=(()=>{class e{constructor(s,o,n,c,u){this._dialogRef=s,this._formBuilder=o,this._translocoService=n,this._storeservice=c,this.data=u,this.buttonDisabled=!1,this.selectedstore=u}ngOnInit(){this.store=this._formBuilder.group({depotCode:["",a.kI.required],depotName:["",a.kI.required],active:[!0]}),this.fillFormData(this.selectedstore)}fillFormData(s){null!==this.selectedstore&&this.store.setValue({depotCode:s.depotCode,depotName:s.depotName,active:s.active})}closeDialog(){this._dialogRef.close({status:null})}addOrUpdateStore(){this.buttonDisabled=!0,this.selectedstore?this.updatestore():this.addstore()}addstore(){const s=new _(this.getFormValueByName("depotCode"),this.getFormValueByName("depotName"),this.getFormValueByName("active"));this._storeservice.createStores(s).subscribe(o=>{o.isSuccessful?(this.showSweetAlert("success"),this._dialogRef.close({status:!0})):this.showSweetAlert("error")},o=>{console.log(o)})}updatestore(){const s=new Y(this.selectedstore.id,this.getFormValueByName("depotCode"),this.getFormValueByName("depotName"),this.getFormValueByName("active"));this._storeservice.updateStores(s).subscribe(o=>{o.isSuccessful?(this.showSweetAlert("success"),this._dialogRef.close({status:!0})):this.showSweetAlert("error")},o=>{console.log(o)})}getFormValueByName(s){return this.store.get(s).value}showSweetAlert(s){if("success"===s){const o=new m.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),d.p.success);S.m.sweetAlert(o)}else{const o=new m.c(this.translate("sweetalert.error"),this.translate("sweetalert.transactionFailed"),d.p.error);S.m.sweetAlert(o)}}translate(s){return this._translocoService.translate(s)}static#t=this.\u0275fac=function(o){return new(o||e)(t.Y36(p.so),t.Y36(a.qu),t.Y36(N.Vn),t.Y36(U.d),t.Y36(p.WI))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-create-edit-store-dialog"]],decls:42,vars:15,consts:[["mat-dialog-title","",1,"mat-dialog-title"],[1,"dialog-close-button",3,"tabIndex","click"],[1,"material-icons"],[1,"modalForm"],[1,"modal-header"],[1,"modal-title"],[4,"ngIf"],[1,"modal-body","mbody-store"],[1,"qm-pr-content"],[1,"container-fluid",3,"formGroup"],[1,"row"],[1,"col-sm-12","mt-2","common-width"],[1,"mb-2",3,"checked","color","formControlName"],[2,"width","100%"],["matInput","",3,"formControlName"],[1,"flex","flex-col","sm:flex-row","sm:items-center","justify-between","mt-4","sm:mt-6"],[1,"-ml-2"],["mat-icon-button",""],[1,"icon-size-5",3,"svgIcon"],[1,"flex","items-center","mt-4","sm:mt-0"],["mat-stroked-button","",1,"ml-auto","sm:ml-0",3,"click"],["mat-flat-button","",1,"order-first","sm:order-last",3,"color","disabled","click"]],template:function(o,n){1&o&&(t.TgZ(0,"h1",0)(1,"button",1),t.NdJ("click",function(){return n.closeDialog()}),t.TgZ(2,"span",2),t._uU(3," highlight_off "),t.qZA()()(),t.TgZ(4,"div",3)(5,"mat-dialog-content")(6,"div",4)(7,"h5",5),t.YNc(8,B,2,0,"span",6),t.YNc(9,E,2,0,"span",6),t.qZA()(),t.TgZ(10,"div",7)(11,"div",8)(12,"div",9)(13,"div",10)(14,"div",11)(15,"mat-checkbox",12),t._uU(16," Aktif "),t.qZA()(),t.TgZ(17,"div",11)(18,"mat-form-field",13)(19,"mat-label"),t._uU(20,"Depo Kodu"),t.qZA(),t._UZ(21,"input",14),t.qZA()(),t.TgZ(22,"div",11)(23,"mat-form-field",13)(24,"mat-label"),t._uU(25,"Depo Ad\u0131"),t.qZA(),t._UZ(26,"input",14),t.qZA()()()()(),t.TgZ(27,"div",15)(28,"div",16)(29,"button",17),t._UZ(30,"mat-icon",18),t.qZA(),t.TgZ(31,"button",17),t._UZ(32,"mat-icon",18),t.qZA(),t.TgZ(33,"button",17),t._UZ(34,"mat-icon",18),t.qZA(),t.TgZ(35,"button",17),t._UZ(36,"mat-icon",18),t.qZA()(),t.TgZ(37,"div",19)(38,"button",20),t.NdJ("click",function(){return n.closeDialog()}),t._uU(39," Vazge\xe7 "),t.qZA(),t.TgZ(40,"button",21),t.NdJ("click",function(){return n.addOrUpdateStore()}),t._uU(41," Kaydet "),t.qZA()()()()()()),2&o&&(t.xp6(1),t.Q6J("tabIndex",-1),t.xp6(7),t.Q6J("ngIf",n.selectedstore),t.xp6(1),t.Q6J("ngIf",!n.selectedstore),t.xp6(3),t.Q6J("formGroup",n.store),t.xp6(3),t.Q6J("checked",!0)("color","primary")("formControlName","active"),t.xp6(6),t.Q6J("formControlName","depotCode"),t.xp6(5),t.Q6J("formControlName","depotName"),t.xp6(4),t.Q6J("svgIcon","heroicons_solid:paper-clip"),t.xp6(2),t.Q6J("svgIcon","heroicons_solid:link"),t.xp6(2),t.Q6J("svgIcon","heroicons_solid:emoji-happy"),t.xp6(2),t.Q6J("svgIcon","heroicons_solid:photograph"),t.xp6(4),t.Q6J("color","primary")("disabled",n.buttonDisabled))},dependencies:[a.Fj,a.JJ,a.JL,f.lW,f.RK,C.KE,C.hX,g.Hw,Z.Nt,a.sg,a.u,T.O5,A.oG,p.uh,p.xY]})}return e})();var J=i(98739);const L=["paginator"];function F(e,r){1&e&&(t.TgZ(0,"th",26),t._uU(1," Depo Kodu "),t.qZA())}function k(e,r){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const s=r.$implicit;t.xp6(1),t.hij(" ",s.depotCode," ")}}function O(e,r){1&e&&(t.TgZ(0,"th",26),t._uU(1," Depo Ad\u0131 "),t.qZA())}function z(e,r){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const s=r.$implicit;t.xp6(1),t.hij(" ",s.depotName," ")}}function R(e,r){1&e&&(t.TgZ(0,"th",26),t._uU(1," Aktif "),t.qZA())}function P(e,r){1&e&&(t.TgZ(0,"mat-icon",30),t._uU(1,"check_box"),t.qZA())}function M(e,r){1&e&&(t.TgZ(0,"mat-icon",30),t._uU(1,"check_box_outline_blank"),t.qZA())}function V(e,r){if(1&e&&(t.TgZ(0,"td",27),t.YNc(1,P,2,0,"mat-icon",28),t.YNc(2,M,2,0,"ng-template",null,29,t.W1O),t.qZA()),2&e){const s=r.$implicit,o=t.MAs(3);t.xp6(1),t.Q6J("ngIf",s.active)("ngIfElse",o)}}function K(e,r){1&e&&t._UZ(0,"tr",31)}function G(e,r){1&e&&t._UZ(0,"tr",32)}function H(e,r){1&e&&(t.TgZ(0,"th",26),t._uU(1," \u0130\u015flemler "),t.qZA())}function W(e,r){if(1&e){const s=t.EpF();t.TgZ(0,"td",27)(1,"button",33),t.NdJ("click",function(){const c=t.CHM(s).$implicit,u=t.oxw();return t.KtG(u.redirectToUpdate(c.id))}),t.TgZ(2,"mat-icon",34),t._uU(3,"edit"),t.qZA()(),t.TgZ(4,"button",35),t.NdJ("click",function(){const c=t.CHM(s).$implicit,u=t.oxw();return t.KtG(u.redirectToDelete(c.id))}),t.TgZ(5,"mat-icon",30),t._uU(6,"delete"),t.qZA()()()}}const j=function(){return[5,10,20]};let q=(()=>{class e{constructor(s,o,n){this._dialog=s,this._storeservice=o,this._translocoService=n,this.displayedColumns=["depotName","depotCode","active","actions"],this.storeList=[],this.dataSource=new l.by(this.storeList),this.redirectToUpdate=c=>{this.isUpdateButtonActive=!0;const u=this.storeList.find(x=>x.id===c);u&&this._dialog.open(y,{maxWidth:"100vw !important",disableClose:!0,data:u}).afterClosed().subscribe(D=>{D.status&&this.getStoreList()})},this.redirectToDelete=c=>{const u=new m.c(this.translate("sweetalert.areYouSure"),this.translate("sweetalert.areYouSureDelete"),d.p.warning);S.m.sweetAlertOfQuestion(u).then(x=>{x.isConfirmed&&this._storeservice.deletedStores({id:c}).subscribe(rt=>{if(rt.isSuccessful){this.getStoreList();const at=new m.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),d.p.success);S.m.sweetAlert(at)}else console.error("Silme i\u015flemi ba\u015far\u0131s\u0131z.")})})}}ngAfterViewInit(){this.dataSource.paginator=this.paginator}ngOnInit(){this.getStoreList()}getStoreList(){this._storeservice.getStoreList().subscribe(s=>{this.storeList=s.data,this.dataSource=new l.by(this.storeList),this.dataSource.paginator=this.paginator})}addPanelOpen(){this.isUpdateButtonActive=!1,this._dialog.open(y,{maxWidth:"100vw !important",disableClose:!0,data:null}).afterClosed().subscribe(o=>{o.status&&this.getStoreList()})}showSweetAlert(s){if("success"===s){const o=new m.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),d.p.success);S.m.sweetAlert(o)}else{const o=new m.c(this.translate("sweetalert.error"),this.translate("sweetalert.transactionFailed"),d.p.error);S.m.sweetAlert(o)}}translate(s){return this._translocoService.translate(s)}static#t=this.\u0275fac=function(o){return new(o||e)(t.Y36(p.uw),t.Y36(U.d),t.Y36(N.Vn))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-store"]],viewQuery:function(o,n){if(1&o&&t.Gf(L,5),2&o){let c;t.iGM(c=t.CRH())&&(n.paginator=c.first)}},decls:37,vars:10,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","p-6","pb-22","sm:pt-12","sm:pb-28","sm:px-10","bg-default","dark:bg-transparent"],[1,"flex-1","min-w-0"],[1,"flex","sm:hidden"],[1,"inline-flex","items-center","-ml-1.5","text-secondary","font-medium",3,"routerLink"],[1,"icon-size-5","text-secondary",3,"svgIcon"],[1,"ml-1"],[1,"mt-2"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate"],[1,"font-medium","tracking-tight","text-secondary"],[1,"flex","shrink-0","items-center","mt-6","sm:mt-0","sm:ml-4"],["mat-flat-button","",1,"ml-3",3,"color","click"],[1,"icon-size-5","mr-2",3,"svgIcon"],[1,"flex-auto","-mt-16","p-6","sm:p-10","rounded-t-2xl","shadow","bg-card"],[1,"mat-elevation-z8"],["mat-table","",3,"dataSource"],["matColumnDef","depotCode"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","depotName"],["matColumnDef","active"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["matColumnDef","actions"],["showFirstLastButtons","","aria-label","Select page of periodic elements",3,"pageSizeOptions","pageSize"],["paginator",""],["mat-header-cell",""],["mat-cell",""],["class","mat-18",4,"ngIf","ngIfElse"],["inactiveIcon",""],[1,"mat-18"],["mat-header-row",""],["mat-row",""],["mat-icon-button","","color","accent",3,"click"],["aria-label","Edit"],["mat-icon-button","","color","warn",3,"click"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div")(4,"div",3)(5,"a",4),t._UZ(6,"mat-icon",5),t.TgZ(7,"span",6),t._uU(8,"Back"),t.qZA()()()(),t.TgZ(9,"div",7)(10,"h2",8),t._uU(11," Depo "),t.qZA()(),t.TgZ(12,"div",9),t._uU(13,"Depo/Envanter Bilgileri"),t.qZA()(),t.TgZ(14,"div",10)(15,"button",11),t.NdJ("click",function(){return n.addPanelOpen()}),t._UZ(16,"mat-icon",12),t._uU(17," Yeni Depo "),t.qZA()()(),t.TgZ(18,"div",13)(19,"div",14)(20,"table",15),t.ynx(21,16),t.YNc(22,F,2,0,"th",17),t.YNc(23,k,2,1,"td",18),t.BQk(),t.ynx(24,19),t.YNc(25,O,2,0,"th",17),t.YNc(26,z,2,1,"td",18),t.BQk(),t.ynx(27,20),t.YNc(28,R,2,0,"th",17),t.YNc(29,V,4,2,"td",18),t.BQk(),t.YNc(30,K,1,0,"tr",21),t.YNc(31,G,1,0,"tr",22),t.ynx(32,23),t.YNc(33,H,2,0,"th",17),t.YNc(34,W,7,0,"td",18),t.BQk(),t.qZA(),t._UZ(35,"mat-paginator",24,25),t.qZA()()()),2&o&&(t.xp6(5),t.Q6J("routerLink","./.."),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:chevron-left"),t.xp6(9),t.Q6J("color","primary"),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:plus"),t.xp6(4),t.Q6J("dataSource",n.dataSource),t.xp6(10),t.Q6J("matHeaderRowDef",n.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",n.displayedColumns),t.xp6(4),t.Q6J("pageSizeOptions",t.DdM(9,j))("pageSize",10))},dependencies:[f.lW,f.RK,g.Hw,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,T.O5,J.NW,h.rH]})}return e})();var I=i(85804),w=i(28255),Q=i(84385),X=i(73162),$=i(3238),tt=i(96308),et=i(90455),ot=i(10266),st=i(44466);const it=[{path:"",component:q}];let nt=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[a.u5,f.ot,C.lN,g.Ps,Z.c,a.u5,a.UX,I.J,w.Tx,a.u5,l.p0,T.ez,g.Ps,C.lN,f.ot,C.lN,g.Ps,Z.c,a.u5,a.UX,I.J,w.Tx,Q.LD,g.Ps,A.p9,f.ot,A.p9,C.lN,g.Ps,Z.c,w.Tx,J.TU,X.Cv,$.si,tt.JX,Q.LD,et.rP,ot.AV,st.m,p.Is,h.Bz.forChild(it)]})}return e})()},70487:(b,v,i)=>{i.d(v,{c:()=>h});class h{constructor(l,p,m){this.title=l,this.text=p,this.icon=m}}}}]);