"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[2941],{77506:(P,g,e)=>{e.d(g,{T:()=>h});var d=e(51723),o=e(94650),p=e(76717);let h=(()=>{class n{constructor(m){this._httpService=m}getparameterList(){return this._httpService.getRequest(d.z.parameters.parametersList)}updateParameters(m){return this._httpService.post(d.z.parameters.updateparameters,m)}createSmsParameters(m){return this._httpService.post(d.z.parameters.createsmsparameters,m)}updateSmsParameters(m){return this._httpService.post(d.z.parameters.updatesmsparameters,m)}getSmsParametersIdBy(m){return this._httpService.post(d.z.parameters.getSmsParametersIdBy,m)}static#t=this.\u0275fac=function(A){return new(A||n)(o.LFG(p.O))};static#e=this.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})()},82941:(P,g,e)=>{e.r(g),e.d(g,{SmsparametersModule:()=>X});var d=e(89299),o=e(24006),p=e(45263),h=e(69079),n=e(70487),v=e(65412);class m{constructor(Z,a,s,i){this.active=Z,this.userName=a,this.password=s,this.smsIntegrationType=i}}class A{constructor(Z,a,s,i,c){this.id=Z,this.active=a,this.userName=s,this.password=i,this.smsIntegrationType=c}}var t=e(94650),T=e(30430),S=e(77506),u=e(4859),l=e(59549),x=e(97392),f=e(284),I=e(36895),y=e(56709);function C(r,Z){1&r&&(t.TgZ(0,"span"),t._uU(1,"SMS Bilgileri G\xfcncelle"),t.qZA())}function U(r,Z){1&r&&(t.TgZ(0,"span"),t._uU(1,"SMS Bilgileri Ekle"),t.qZA())}function b(r,Z){1&r&&t._UZ(0,"mat-icon",23),2&r&&t.Q6J("svgIcon","heroicons_solid:eye")}function E(r,Z){1&r&&t._UZ(0,"mat-icon",23),2&r&&t.Q6J("svgIcon","heroicons_solid:eye-off")}let F=(()=>{class r{constructor(a,s,i,c,w){this._dialogRef=a,this._formBuilder=s,this._translocoService=i,this.data=c,this._parametersService=w,this.buttonDisabled=!1,this.selectedsmsparameters=c.selectedsmsparameters,this.smsintegrationtype=c.smsparameterstype}ngOnInit(){this.smsparameters=this._formBuilder.group({active:[!0],username:["",o.kI.required],password:["",o.kI.required]}),this.fillFormData(this.selectedsmsparameters)}fillFormData(a){null!=this.selectedsmsparameters&&this.smsparameters.setValue({active:a.active,username:a.userName,password:a.password})}closeDialog(){this._dialogRef.close({status:null})}addOrUpdateSmsParameter(){this.buttonDisabled=!0,this.selectedsmsparameters?this.updatesmsparameter():this.addsmsparameter()}addsmsparameter(){const a=new m(this.getFormValueByName("active"),this.getFormValueByName("username"),this.getFormValueByName("password"),this.smsintegrationtype);this._parametersService.createSmsParameters(a).subscribe(s=>{s.isSuccessful?(this.showSweetAlert("success"),this._dialogRef.close({status:!0})):this.showSweetAlert("error")},s=>{console.log(s)})}updatesmsparameter(){const a=new A(this.selectedsmsparameters.id,this.getFormValueByName("active"),this.getFormValueByName("username"),this.getFormValueByName("password"),this.smsintegrationtype);this._parametersService.updateSmsParameters(a).subscribe(s=>{s.isSuccessful?(this.showSweetAlert("success"),this._dialogRef.close({status:!0})):this.showSweetAlert("error")},s=>{console.log(s)})}getFormValueByName(a){return this.smsparameters.get(a).value}showSweetAlert(a){if("success"===a){const s=new n.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),h.p.success);p.m.sweetAlert(s)}else{const s=new n.c(this.translate("sweetalert.error"),this.translate("sweetalert.transactionFailed"),h.p.error);p.m.sweetAlert(s)}}translate(a){return this._translocoService.translate(a)}static#t=this.\u0275fac=function(s){return new(s||r)(t.Y36(v.so),t.Y36(o.qu),t.Y36(T.Vn),t.Y36(v.WI),t.Y36(S.T))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["app-create-edit-smsparameters"]],decls:48,vars:17,consts:[["mat-dialog-title","",1,"mat-dialog-title"],[1,"dialog-close-button",3,"tabIndex","click"],[1,"material-icons"],[1,"modalForm"],[1,"modal-header"],[1,"modal-title"],[4,"ngIf"],[1,"modal-body","mbody-smsparameters"],[1,"qm-pr-content"],[1,"container-fluid",3,"formGroup"],[1,"row"],[1,"col-sm-12","mt-2","common-width"],[1,"mb-2",3,"checked","color","formControlName"],[2,"width","100%"],["matInput","",3,"formControlName"],[1,"w-full"],["id","password","matInput","","type","password",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[1,"flex","flex-col","sm:flex-row","sm:items-center","justify-between","mt-4","sm:mt-6"],[1,"-ml-2"],["mat-icon-button",""],[1,"icon-size-5",3,"svgIcon"],[1,"flex","items-center","mt-4","sm:mt-0"],["mat-stroked-button","",1,"ml-auto","sm:ml-0",3,"click"],["mat-flat-button","",1,"order-first","sm:order-last",3,"color","disabled","click"]],template:function(s,i){if(1&s){const c=t.EpF();t.TgZ(0,"h1",0)(1,"button",1),t.NdJ("click",function(){return i.closeDialog()}),t.TgZ(2,"span",2),t._uU(3," highlight_off "),t.qZA()()(),t.TgZ(4,"div",3)(5,"mat-dialog-content")(6,"div",4)(7,"h5",5),t.YNc(8,C,2,0,"span",6),t.YNc(9,U,2,0,"span",6),t.qZA()(),t.TgZ(10,"div",7)(11,"div",8)(12,"div",9)(13,"div",10)(14,"div",11)(15,"mat-checkbox",12),t._uU(16," Aktif "),t.qZA()(),t.TgZ(17,"div",11)(18,"mat-form-field",13)(19,"mat-label"),t._uU(20,"Kullan\u0131c\u0131 Ad\u0131"),t.qZA(),t._UZ(21,"input",14),t.qZA()(),t.TgZ(22,"div",11)(23,"mat-form-field",15)(24,"mat-label"),t._uU(25,"Parola"),t.qZA(),t._UZ(26,"input",16,17),t.TgZ(28,"button",18),t.NdJ("click",function(){t.CHM(c);const D=t.MAs(27);return t.KtG(D.type="password"===D.type?"text":"password")}),t.YNc(29,b,1,1,"mat-icon",19),t.YNc(30,E,1,1,"mat-icon",19),t.qZA(),t.TgZ(31,"mat-error"),t._uU(32," Password is required "),t.qZA()()()()()(),t.TgZ(33,"div",20)(34,"div",21)(35,"button",22),t._UZ(36,"mat-icon",23),t.qZA(),t.TgZ(37,"button",22),t._UZ(38,"mat-icon",23),t.qZA(),t.TgZ(39,"button",22),t._UZ(40,"mat-icon",23),t.qZA(),t.TgZ(41,"button",22),t._UZ(42,"mat-icon",23),t.qZA()(),t.TgZ(43,"div",24)(44,"button",25),t.NdJ("click",function(){return i.closeDialog()}),t._uU(45," Vazge\xe7 "),t.qZA(),t.TgZ(46,"button",26),t.NdJ("click",function(){return i.addOrUpdateSmsParameter()}),t._uU(47," Kaydet "),t.qZA()()()()()()}if(2&s){const c=t.MAs(27);t.xp6(1),t.Q6J("tabIndex",-1),t.xp6(7),t.Q6J("ngIf",i.selectedsmsparameters),t.xp6(1),t.Q6J("ngIf",!i.selectedsmsparameters),t.xp6(3),t.Q6J("formGroup",i.smsparameters),t.xp6(3),t.Q6J("checked",!0)("color","primary")("formControlName","active"),t.xp6(6),t.Q6J("formControlName","username"),t.xp6(5),t.Q6J("formControlName","password"),t.xp6(3),t.Q6J("ngIf","password"===c.type),t.xp6(1),t.Q6J("ngIf","text"===c.type),t.xp6(6),t.Q6J("svgIcon","heroicons_solid:paper-clip"),t.xp6(2),t.Q6J("svgIcon","heroicons_solid:link"),t.xp6(2),t.Q6J("svgIcon","heroicons_solid:emoji-happy"),t.xp6(2),t.Q6J("svgIcon","heroicons_solid:photograph"),t.xp6(4),t.Q6J("color","primary")("disabled",i.buttonDisabled)}},dependencies:[o.Fj,o.JJ,o.JL,u.lW,u.RK,l.KE,l.hX,l.TO,l.R9,x.Hw,f.Nt,o.sg,o.u,I.O5,y.oG,v.uh,v.xY]})}return r})();var N=e(77579),B=e(37188),Q=e(82722),z=e(19602);let M=(()=>{class r{constructor(a,s,i){this._dialog=a,this._translocoService=s,this._parametersService=i,this.destroy$=new N.x}ngOnInit(){}updatesms(a){(0,B.$)(this.getSmsParamters(a)).pipe((0,Q.R)(this.destroy$)).subscribe({next:s=>{this.setProducesResponse(s[0])},error:s=>{console.log(s)},complete:()=>{this._dialog.open(F,{maxWidth:"100vw !important",disableClose:!0,data:{smsparameterstype:a,selectedsmsparameters:this.selectedsmsparameters}}).afterClosed().subscribe(c=>{})}})}showSweetAlert(a){if("success"===a){const s=new n.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),h.p.success);p.m.sweetAlert(s)}else{const s=new n.c(this.translate("sweetalert.error"),this.translate("sweetalert.transactionFailed"),h.p.error);p.m.sweetAlert(s)}}translate(a){return this._translocoService.translate(a)}getSmsParamters(a){return this._parametersService.getSmsParametersIdBy({smsIntegrationType:a})}setProducesResponse(a){this.selectedsmsparameters=a.data}static#t=this.\u0275fac=function(s){return new(s||r)(t.Y36(v.uw),t.Y36(T.Vn),t.Y36(S.T))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["app-smsparameters"]],decls:26,vars:4,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","p-6","sm:py-8","sm:px-10","border-b","bg-card","dark:bg-transparent"],[1,"flex-1","min-w-0"],[1,"flex","sm:hidden"],[1,"inline-flex","items-center","-ml-1.5","text-secondary","font-medium",3,"routerLink"],[1,"icon-size-5","text-secondary",3,"svgIcon"],[1,"ml-1"],[1,"mt-2"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate"],[1,"font-medium","tracking-tight","text-secondary"],[1,"flex","shrink-0","items-center","mt-6","sm:mt-0","sm:ml-4"],[1,"flex-auto","p-6","sm:p-10"],[1,"flex","flex-wrap","items-start","w-full","max-w-400","-m-4"],[1,"flex","flex-col","items-center","max-w-80","w-full","p-8","filter-info"],[1,"flex","items-center","justify-center","p-5","rounded-full","bg-primary-100","dark:bg-gray-600"],[1,"icon-size-10","text-primary-500","dark:text-primary-300",3,"svgIcon"],[1,"text-2xl","font-semibold","leading-tight","text-center","mt-6"],[1,"text-center","text-secondary","mt-3"],["mat-flat-button","",1,"px-6","mt-8",3,"color","click"]],template:function(s,i){1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div")(4,"div",3)(5,"a",4),t._UZ(6,"mat-icon",5),t.TgZ(7,"span",6),t._uU(8,"Back"),t.qZA()()()(),t.TgZ(9,"div",7)(10,"h2",8),t._uU(11," SMS Parametreleri "),t.qZA()(),t.TgZ(12,"div",9),t._uU(13,"SMS Tan\u0131mlamlar\u0131"),t.qZA()(),t._UZ(14,"div",10),t.qZA(),t.TgZ(15,"div",11)(16,"div",12)(17,"fuse-card",13)(18,"div",14),t._UZ(19,"mat-icon",15),t.qZA(),t.TgZ(20,"div",16),t._uU(21,"MutluCELL"),t.qZA(),t.TgZ(22,"div",17),t._uU(23,"\u0130leti\u015fim sekt\xf6r\xfcnde 10. y\u0131l\u0131n\u0131 geride b\u0131rakan Mutlucell 2010 y\u0131l\u0131ndan itibaren BTK (Bilgi Teknoloji Kurumu) taraf\u0131ndan temin edilen STH (Sabit Telefon Hizmeti) ve SM\u015eH (Sanal Mobil \u015eebeke Hizmeti) Yetki Belgeleri ile Hizmet veren bir telekom\xfcnikasyon firmas\u0131d\u0131r."),t.qZA(),t.TgZ(24,"a",18),t.NdJ("click",function(){return i.updatesms(1)}),t._uU(25," Bilgileri G\xfcncelle "),t.qZA()()()()()),2&s&&(t.xp6(5),t.Q6J("routerLink","./.."),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:chevron-left"),t.xp6(13),t.Q6J("svgIcon","heroicons_outline:support"),t.xp6(5),t.Q6J("color","primary"))},dependencies:[u.zs,x.Hw,z.y,d.rH]})}return r})();var O=e(85804),Y=e(28255),L=e(30671),J=e(84385),R=e(98739),V=e(73162),k=e(3238),H=e(96308),K=e(90455),j=e(10266),G=e(44466);const W=[{path:"",component:M}];let X=(()=>{class r{static#t=this.\u0275fac=function(s){return new(s||r)};static#e=this.\u0275mod=t.oAB({type:r});static#s=this.\u0275inj=t.cJS({imports:[o.u5,u.ot,l.lN,x.Ps,f.c,o.u5,o.UX,O.J,Y.Tx,o.u5,L.p0,I.ez,J.LD,y.p9,y.p9,R.TU,V.Cv,k.si,H.JX,J.LD,K.rP,j.AV,G.m,v.Is,d.Bz.forChild(W)]})}return r})()},70487:(P,g,e)=>{e.d(g,{c:()=>d});class d{constructor(p,h,n){this.title=p,this.text=h,this.icon=n}}},37188:(P,g,e)=>{e.d(g,{$:()=>A});var d=e(69751),o=e(38421);const{isArray:p}=Array;var n=e(60515),v=e(25403),m=e(63269);function A(...t){const T=(0,m.jO)(t),S=function h(t){return 1===t.length&&p(t[0])?t[0]:t}(t);return S.length?new d.y(u=>{let l=S.map(()=>[]),x=S.map(()=>!1);u.add(()=>{l=x=null});for(let f=0;!u.closed&&f<S.length;f++)(0,o.Xf)(S[f]).subscribe((0,v.x)(u,I=>{if(l[f].push(I),l.every(y=>y.length)){const y=l.map(C=>C.shift());u.next(T?T(...y):y),l.some((C,U)=>!C.length&&x[U])&&u.complete()}},()=>{x[f]=!0,!l[f].length&&u.complete()}));return()=>{l=x=null}}):n.E}}}]);