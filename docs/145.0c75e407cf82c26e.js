"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[145],{77506:(F,g,n)=>{n.d(g,{T:()=>C});var c=n(51723),o=n(94650),v=n(76717);let C=(()=>{class d{constructor(m){this._httpService=m}getparameterList(){return this._httpService.getRequest(c.z.parameters.parametersList)}updateParameters(m){return this._httpService.post(c.z.parameters.updateparameters,m)}createSmsParameters(m){return this._httpService.post(c.z.parameters.createsmsparameters,m)}updateSmsParameters(m){return this._httpService.post(c.z.parameters.updatesmsparameters,m)}getSmsParametersIdBy(m){return this._httpService.post(c.z.parameters.getSmsParametersIdBy,m)}static#e=this.\u0275fac=function(_){return new(_||d)(o.LFG(v.O))};static#t=this.\u0275prov=o.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()},90145:(F,g,n)=>{n.r(g),n.d(g,{ParametersModule:()=>ee});var c=n(89299),o=n(24006),v=n(77579),C=n(82722);class d{constructor(l,t,s,a,r,M,te,ae,se,ne,ie,oe,re,le,me,ce,de,ue,pe){this.id=l,this.appointmentReminderDuration=t,this.agendaNoteReminder=s,this.days=a,this.smsCompany=r,this.cashAccount=M,this.creditCardCashAccount=te,this.bankTransferCashAccount=ae,this.whatsappTemplate=se,this.customerWelcomeTemplate=ne,this.automaticAppointmentReminderMessageTemplate=ie,this.isOtoCustomerWelcomeMessage=oe,this.displayVetNo=re,this.autoSms=le,this.isAnimalsBreeds=me,this.isFirstInspection=ce,this.appointmentBeginDate=de,this.appointmentEndDate=ue,this.isExaminationAmuntZero=pe}}var J=n(45263),m=n(69079),_=n(70487),e=n(94650),k=n(77506),U=n(30430),H=n(76640),h=n(4859),p=n(59549),u=n(97392),f=n(284),T=n(84385),P=n(3238),Z=n(90455),N=n(36895);function I(i,l){1&i&&(e.TgZ(0,"div",17),e._UZ(1,"div",18)(2,"div",18)(3,"div",18)(4,"div",18)(5,"div",18)(6,"div",18)(7,"div",18)(8,"div",18),e.qZA())}function Q(i,l){if(1&i&&(e.TgZ(0,"mat-option",43),e._uU(1),e.qZA()),2&i){const t=l.$implicit,s=e.oxw(2);e.Q6J("value",t)("disabled",s.isEndDateDisabled(t)),e.xp6(1),e.hij(" ",t," ")}}function V(i,l){if(1&i&&(e.TgZ(0,"mat-option",43),e._uU(1),e.qZA()),2&i){const t=l.$implicit,s=e.oxw(2);e.Q6J("value",t)("disabled",s.isBeginDateDisabled(t)),e.xp6(1),e.hij(" ",t," ")}}function O(i,l){if(1&i&&(e.TgZ(0,"mat-option",44),e._uU(1),e.qZA()),2&i){const t=l.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function K(i,l){if(1&i&&(e.TgZ(0,"mat-option",44),e._uU(1),e.qZA()),2&i){const t=l.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.casename)}}function E(i,l){if(1&i&&(e.TgZ(0,"mat-option",44),e._uU(1),e.qZA()),2&i){const t=l.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.casename)}}function w(i,l){if(1&i&&(e.TgZ(0,"mat-option",44),e._uU(1),e.qZA()),2&i){const t=l.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.casename)}}const x=function(){return{standalone:!0}};function R(i,l){if(1&i){const t=e.EpF();e.TgZ(0,"div",19)(1,"div",20)(2,"div",21),e._uU(3,"Ajanda Notu Hat\u0131rlatma(G\xfcn)"),e.qZA(),e.TgZ(4,"mat-form-field"),e._UZ(5,"input",22),e.qZA()(),e.TgZ(6,"div",20)(7,"div",21),e._uU(8,"SMS \u015eirketi"),e.qZA(),e.TgZ(9,"mat-form-field",23)(10,"mat-select",24,25),e.NdJ("selectionChange",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.onSmsCompanySelectionChange(a))}),e.TgZ(12,"mat-option"),e._uU(13,"None"),e.qZA()()()(),e.TgZ(14,"div",20)(15,"div",21),e._uU(16,"Online Randevu Ba\u015flang\u0131\xe7"),e.qZA(),e.TgZ(17,"mat-form-field")(18,"mat-select",26),e.YNc(19,Q,2,3,"mat-option",27),e.qZA()()(),e.TgZ(20,"div",20)(21,"div",21),e._uU(22,"Online Randevu Biti\u015f"),e.qZA(),e.TgZ(23,"mat-form-field")(24,"mat-select",26),e.YNc(25,V,2,3,"mat-option",27),e.qZA()()(),e.TgZ(26,"div",20)(27,"div",21),e._uU(28,"Randevu Hat\u0131rlatma S\xfcresi(G\xfcn)"),e.qZA(),e.TgZ(29,"mat-form-field"),e._UZ(30,"input",22),e.qZA()(),e.TgZ(31,"div",20)(32,"div",21),e._uU(33,"\xc7al\u0131\u015fma G\xfcnleri"),e.qZA(),e.TgZ(34,"mat-form-field")(35,"mat-select",28)(36,"mat-option",29),e.NdJ("click",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.selectAllDays(a))}),e._uU(37),e.qZA(),e.YNc(38,O,2,2,"mat-option",30),e.qZA()()(),e.TgZ(39,"div",20)(40,"div",21),e._uU(41,"Nakit Kasa Hesab\u0131"),e.qZA(),e.TgZ(42,"mat-form-field",31)(43,"mat-select",32)(44,"mat-select-filter",33),e.NdJ("ngModelChange",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.filterCustomerId(a))}),e.qZA(),e.YNc(45,K,2,2,"mat-option",30),e.qZA()()(),e.TgZ(46,"div",20)(47,"div",21),e._uU(48,"Kredi Kart\u0131 Kasa Hesab\u0131"),e.qZA(),e.TgZ(49,"mat-form-field",31)(50,"mat-select",32)(51,"mat-select-filter",33),e.NdJ("ngModelChange",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.filterCustomerId(a))}),e.qZA(),e.YNc(52,E,2,2,"mat-option",30),e.qZA()()(),e.TgZ(53,"div",20)(54,"div",21),e._uU(55,"Banka Havale Kasa Hesab\u0131"),e.qZA(),e.TgZ(56,"mat-form-field",31)(57,"mat-select",32)(58,"mat-select-filter",33),e.NdJ("ngModelChange",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.filterCustomerId(a))}),e.qZA(),e.YNc(59,w,2,2,"mat-option",30),e.qZA()()(),e.TgZ(60,"div",20)(61,"div",21),e._uU(62,"Whatsapp \u015eablonu"),e.qZA(),e.TgZ(63,"mat-form-field",23)(64,"mat-select",24,34),e.NdJ("selectionChange",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.onwhatsappTemplateSelectionChange(a))}),e.TgZ(66,"mat-option"),e._uU(67,"None"),e.qZA()()()(),e.TgZ(68,"div",20)(69,"div",21),e._uU(70,"M\xfc\u015fteri Ho\u015fgeldin \u015eablonu"),e.qZA(),e.TgZ(71,"mat-form-field",23)(72,"mat-select",24,35),e.NdJ("selectionChange",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.oncustomerWelcomeTemplateSelectionChange(a))}),e.TgZ(74,"mat-option"),e._uU(75,"None"),e.qZA()()()(),e.TgZ(76,"div",20)(77,"div",21),e._uU(78,"Otomatik Randevu Hat\u0131rlatma Mesaj\u0131 \u015eablonu"),e.qZA(),e.TgZ(79,"mat-form-field",23)(80,"mat-select",24,35),e.NdJ("selectionChange",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.onautomaticAppointmentReminderMessageTemplateSelectionChange(a))}),e.TgZ(82,"mat-option"),e._uU(83,"None"),e.qZA()()()(),e.TgZ(84,"div",36),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(88);return e.KtG(a.toggle())}),e.TgZ(85,"div",21),e._uU(86,"Veteriner Numaras\u0131 G\xf6z\xfcks\xfcn(SMS)"),e.qZA(),e.TgZ(87,"mat-slide-toggle",37,38),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(88);return e.KtG(a.toggle())}),e.qZA()(),e.TgZ(89,"div",36),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(93);return e.KtG(a.toggle())}),e.TgZ(90,"div",21),e._uU(91,"Otomatik M\xfc\u015fteri Ho\u015fgeldin Mesaj\u0131 G\xf6nderilsin mi?"),e.qZA(),e.TgZ(92,"mat-slide-toggle",37,39),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(93);return e.KtG(a.toggle())}),e.qZA()(),e.TgZ(94,"div",36),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(98);return e.KtG(a.toggle())}),e.TgZ(95,"div",21),e._uU(96,"Otomatik Sms"),e.qZA(),e.TgZ(97,"mat-slide-toggle",37,40),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(98);return e.KtG(a.toggle())}),e.qZA()(),e.TgZ(99,"div",36),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(103);return e.KtG(a.toggle())}),e.TgZ(100,"div",21),e._uU(101,"Hasta Ekleme i\u015fleminde Irk\u0131 Zorunlu Olsun"),e.qZA(),e.TgZ(102,"mat-slide-toggle",37,41),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(103);return e.KtG(a.toggle())}),e.qZA()(),e.TgZ(104,"div",36),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(108);return e.KtG(a.toggle())}),e.TgZ(105,"div",21),e._uU(106,'\u0130\u015flemlerde "\u0130lk Muayene" G\xf6z\xfcks\xfcn'),e.qZA(),e.TgZ(107,"mat-slide-toggle",37,42),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(108);return e.KtG(a.toggle())}),e.qZA()(),e.TgZ(109,"div",36),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(108);return e.KtG(a.toggle())}),e.TgZ(110,"div",21),e._uU(111,"Muayane Giri\u015flerinde Sat\u0131\u015f Kayd\u0131 \xdcretilsin (Tutar 0 ise)"),e.qZA(),e.TgZ(112,"mat-slide-toggle",37,42),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(108);return e.KtG(a.toggle())}),e.qZA()()()}if(2&i){const t=e.oxw();e.xp6(5),e.Q6J("formControlName","agendaNoteReminder"),e.xp6(5),e.Q6J("formControlName","smsCompany")("placeholder",""),e.xp6(8),e.Q6J("formControlName","appointmentBeginDate"),e.xp6(1),e.Q6J("ngForOf",t.times),e.xp6(5),e.Q6J("formControlName","appointmentEndDate"),e.xp6(1),e.Q6J("ngForOf",t.times),e.xp6(5),e.Q6J("formControlName","appointmentReminderDuration"),e.xp6(5),e.Q6J("formControl",t.selectedDays),e.xp6(1),e.Q6J("value",t.allselectcheck),e.xp6(1),e.Oqu(t.allselectcheck),e.xp6(1),e.Q6J("ngForOf",t.days),e.xp6(5),e.Q6J("formControlName","cashAccount")("placeholder","Nakit Kasa Hesab\u0131"),e.xp6(1),e.Q6J("ngModelOptions",e.DdM(45,x))("ngModel",t.selectedCasingId),e.xp6(1),e.Q6J("ngForOf",t.casingcards),e.xp6(5),e.Q6J("formControlName","creditCardCashAccount")("placeholder","Kredi Kart\u0131 Kasa Hesab\u0131"),e.xp6(1),e.Q6J("ngModelOptions",e.DdM(46,x))("ngModel",t.selectedCasingId),e.xp6(1),e.Q6J("ngForOf",t.casingcards),e.xp6(5),e.Q6J("formControlName","bankTransferCashAccount")("placeholder","Banka Havale Kasa Hesab\u0131"),e.xp6(1),e.Q6J("ngModelOptions",e.DdM(47,x))("ngModel",t.selectedCasingId),e.xp6(1),e.Q6J("ngForOf",t.casingcards),e.xp6(5),e.Q6J("formControlName","whatsappTemplate")("placeholder",""),e.xp6(8),e.Q6J("formControlName","customerWelcomeTemplate")("placeholder",""),e.xp6(8),e.Q6J("formControlName","automaticAppointmentReminderMessageTemplate")("placeholder",""),e.xp6(7),e.Q6J("color","primary")("formControlName","displayVetNo"),e.xp6(5),e.Q6J("color","primary")("formControlName","isOtoCustomerWelcomeMessage"),e.xp6(5),e.Q6J("color","primary")("formControlName","autoSms"),e.xp6(5),e.Q6J("color","primary")("formControlName","isAnimalsBreeds"),e.xp6(5),e.Q6J("color","primary")("formControlName","isFirstInspection"),e.xp6(5),e.Q6J("color","primary")("formControlName","isExaminationAmuntZero")}}let G=(()=>{class i{constructor(t,s,a,r,M){this._formBuilder=t,this._parametersService=s,this.cdr=a,this._translocoService=r,this._casingdefinitionService=M,this.days=["Pazartesi","Sal\u0131","\xc7ar\u015famba","Per\u015fembe","Cuma","Cumartesi","Pazar"],this.times=["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"],this.selectedDays=new o.NI([]),this.allselectcheck="T\xfcm\xfcn\xfc Se\xe7",this.checkAllSelect=!1,this.weeks="",this._unsubscribeAll=new v.x,this.updateid="",this.casingcards=[],this.selectedCasingId="",this.loader=!0}ngOnInit(){this.getCasingDefinition(),this.getParametersList(),this.parameters=this._formBuilder.group({id:[""],appointmentReminderDuration:[0],smsCompany:[""],agendaNoteReminder:[0],days:[[]],cashAccount:[""],creditCardCashAccount:[""],bankTransferCashAccount:[""],whatsappTemplate:[""],customerWelcomeTemplate:[""],isOtoCustomerWelcomeMessage:[!1],autoSms:[!1],displayVetNo:[!1],automaticAppointmentReminderMessageTemplate:[""],isAnimalsBreeds:[!1],isFirstInspection:[!1],appointmentBeginDate:[""],appointmentEndDate:[""],isExaminationAmuntZero:[!1]})}ngAfterViewInit(){}isEndDateDisabled(t){const s=parseInt(t.split(":")[0]);return parseInt(this.parameters.value.appointmentEndDate.split(":")[0])<=s}isBeginDateDisabled(t){const s=parseInt(t.split(":")[0]);return parseInt(this.parameters.value.appointmentBeginDate.split(":")[0])>=s}getCasingDefinition(){this._casingdefinitionService.getCasingDefinitionList().subscribe(t=>{this.casingcards=t.data,console.log(this.casingcards)})}getParametersList(){this._parametersService.getparameterList().pipe((0,C.R)(this._unsubscribeAll)).subscribe(t=>{t&&t.data&&(this.getParameters=t.data,this.cdr.markForCheck(),t.data.length>0)&&this.fillFormData(this.getParameters)})}fillFormData(t){const s=t[0].days.split(",").slice(0,-1);""==t[0].appointmentBeginDate&&(t[0].appointmentBeginDate="10:00",t[0].appointmentEndDate="19:00"),null!==this.getParameters&&(this.parameters.setValue({id:t[0].id,appointmentReminderDuration:t[0].appointmentReminderDuration,smsCompany:t[0].smsCompany,agendaNoteReminder:t[0].agendaNoteReminder,days:s,cashAccount:t[0].cashAccount,creditCardCashAccount:t[0].creditCardCashAccount,bankTransferCashAccount:t[0].bankTransferCashAccount,whatsappTemplate:t[0].whatsappTemplate,customerWelcomeTemplate:t[0].customerWelcomeTemplate,isOtoCustomerWelcomeMessage:t[0].isOtoCustomerWelcomeMessage,autoSms:t[0].autoSms,displayVetNo:t[0].displayVetNo,automaticAppointmentReminderMessageTemplate:t[0].automaticAppointmentReminderMessageTemplate,isAnimalsBreeds:t[0].isAnimalsBreeds,isFirstInspection:t[0].isFirstInspection,appointmentBeginDate:t[0].appointmentBeginDate,appointmentEndDate:t[0].appointmentEndDate,isExaminationAmuntZero:t[0].isExaminationAmuntZero}),this.selectedDays.setValue(s)),this.loader=!1}filterCustomerId(t){this.selectedCasingId=t}onSmsCompanySelectionChange(t){}oncashAccountSelectionChange(t){}oncreditCardCashAccountSelectionChange(t){}onbankTransferCashAccountSelectionChange(t){}onwhatsappTemplateSelectionChange(t){}oncustomerWelcomeTemplateSelectionChange(t){}onautomaticAppointmentReminderMessageTemplateSelectionChange(t){}getFormValueByName(t){return this.parameters.get(t).value}saveParameter(){const t=this.getParameters.length;0===t&&(this.updateid="00000000-0000-0000-0000-000000000000"),0!==t&&(this.updateid=this.getParameters[0].id);const s=new d(this.updateid,this.getFormValueByName("appointmentReminderDuration"),this.getFormValueByName("agendaNoteReminder"),this.getFormValueByName("days"),""!==this.getFormValueByName("smsCompany")?this.getFormValueByName("smsCompany"):"00000000-0000-0000-0000-000000000000",""!==this.getFormValueByName("cashAccount")?this.getFormValueByName("cashAccount"):"00000000-0000-0000-0000-000000000000",""!==this.getFormValueByName("creditCardCashAccount")?this.getFormValueByName("creditCardCashAccount"):"00000000-0000-0000-0000-000000000000",""!==this.getFormValueByName("bankTransferCashAccount")?this.getFormValueByName("bankTransferCashAccount"):"00000000-0000-0000-0000-000000000000",""!==this.getFormValueByName("whatsappTemplate")?this.getFormValueByName("whatsappTemplate"):"00000000-0000-0000-0000-000000000000",""!==this.getFormValueByName("customerWelcomeTemplate")?this.getFormValueByName("customerWelcomeTemplate"):"00000000-0000-0000-0000-000000000000",""!==this.getFormValueByName("automaticAppointmentReminderMessageTemplate")?this.getFormValueByName("automaticAppointmentReminderMessageTemplate"):"00000000-0000-0000-0000-000000000000",this.getFormValueByName("isOtoCustomerWelcomeMessage"),this.getFormValueByName("displayVetNo"),this.getFormValueByName("autoSms"),this.getFormValueByName("isAnimalsBreeds"),this.getFormValueByName("isFirstInspection"),this.getFormValueByName("appointmentBeginDate"),this.getFormValueByName("appointmentEndDate"),this.getFormValueByName("isExaminationAmuntZero"));this.selectedDays.value.forEach(a=>{this.weeks+=a+","}),s.days=this.weeks,this._parametersService.updateParameters(s).subscribe(a=>{a.isSuccessful?(this.showSweetAlert("success"),this.getParametersList()):this.showSweetAlert("error")},a=>{console.log(a)})}selectAllDays(t){"T\xfcm\xfcn\xfc Kald\u0131r"==this.allselectcheck?(this.checkAllSelect=!1,this.selectedDays.setValue([]),this.allselectcheck="T\xfcm\xfcn\xfc Se\xe7"):(this.checkAllSelect=!0,this.allselectcheck="T\xfcm\xfcn\xfc Kald\u0131r",this.selectedDays.setValue(this.days))}showSweetAlert(t){if("success"===t){const s=new _.c(this.translate("sweetalert.success"),this.translate("sweetalert.transactionSuccessful"),m.p.success);J.m.sweetAlert(s)}else{const s=new _.c(this.translate("sweetalert.error"),this.translate("sweetalert.transactionFailed"),m.p.error);J.m.sweetAlert(s)}}translate(t){return this._translocoService.translate(t)}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(o.QS),e.Y36(k.T),e.Y36(e.sBO),e.Y36(U.Vn),e.Y36(H.J))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-parameters"]],decls:23,vars:7,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","p-6","pb-22","sm:pt-12","sm:pb-28","sm:px-10","bg-default","dark:bg-transparent"],[1,"flex-1","min-w-0"],[1,"flex","sm:hidden"],[1,"inline-flex","items-center","-ml-1.5","text-secondary","font-medium",3,"routerLink"],[1,"icon-size-5","text-secondary",3,"svgIcon"],[1,"ml-1"],[1,"mt-2"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate"],[1,"font-medium","tracking-tight","text-secondary"],[1,"flex","shrink-0","items-center","mt-6","sm:mt-0","sm:ml-4"],["mat-flat-button","",1,"ml-3",3,"color","click"],[1,"icon-size-5","mr-2",3,"svgIcon"],[1,"flex-auto","-mt-16","p-6","sm:p-10","rounded-t-2xl","shadow","bg-card"],[3,"formGroup"],["role","status","class","animate-pulse",4,"ngIf"],["class","grid grid-cols-2 gap-6 w-full mt-8",4,"ngIf"],["role","status",1,"animate-pulse"],[1,"h-2.5","bg-gray-200","rounded-full","dark:bg-gray-700","w-full","mb-4"],[1,"grid","grid-cols-2","gap-6","w-full","mt-8"],[1,"flex-auto","items-center","justify-between","cursor-pointer"],[1,"leading-6","font-medium"],["type","number","matInput","",1,"ml-2",3,"formControlName"],[1,"w-full"],["name","",3,"formControlName","placeholder","selectionChange"],["securityToggle",""],["placeholder","Select Time",3,"formControlName"],[3,"value","disabled",4,"ngFor","ngForOf"],["multiple","",1,"ml-2",3,"formControl"],[3,"value","click"],[3,"value",4,"ngFor","ngForOf"],[2,"width","100%"],[3,"formControlName","placeholder"],[3,"ngModelOptions","ngModel","ngModelChange"],["whatsappTemplateToggle",""],["customerWelcomeTemplateToggle",""],[1,"flex","items-center","justify-between","cursor-pointer",3,"click"],[1,"ml-2",3,"color","formControlName","click"],["displayVetNoToggle",""],["isOtoCustomerWelcomeMessageToggle",""],["autoSmsToggle",""],["isAnimalsBreedsToggle",""],["isfirstInspectionToggle",""],[3,"value","disabled"],[3,"value"]],template:function(s,a){1&s&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div")(4,"div",3)(5,"a",4),e._UZ(6,"mat-icon",5),e.TgZ(7,"span",6),e._uU(8,"Back"),e.qZA()()()(),e.TgZ(9,"div",7)(10,"h2",8),e._uU(11," Parametreler "),e.qZA()(),e.TgZ(12,"div",9),e._uU(13,"Sistem Y\xf6neticisi taraf\u0131ndan i\u015fleni\u015f parametreleri "),e.qZA()(),e.TgZ(14,"div",10)(15,"button",11),e.NdJ("click",function(){return a.saveParameter()}),e._UZ(16,"mat-icon",12),e._uU(17," Kaydet "),e.qZA()(),e._UZ(18,"div",10),e.qZA(),e.TgZ(19,"div",13)(20,"form",14),e.YNc(21,I,9,0,"div",15),e.YNc(22,R,114,48,"div",16),e.qZA()()()),2&s&&(e.xp6(5),e.Q6J("routerLink","./.."),e.xp6(1),e.Q6J("svgIcon","heroicons_solid:chevron-left"),e.xp6(9),e.Q6J("color","primary"),e.xp6(1),e.Q6J("svgIcon","heroicons_solid:link"),e.xp6(4),e.Q6J("formGroup",a.parameters),e.xp6(1),e.Q6J("ngIf",a.loader),e.xp6(1),e.Q6J("ngIf",!a.loader))},dependencies:[o._Y,o.Fj,o.wV,o.JJ,o.JL,o.On,h.lW,p.KE,u.Hw,f.Nt,o.oH,o.sg,o.u,T.gD,P.ey,Z.Rr,N.sg,N.O5,c.rH]})}return i})();var y=n(85804),A=n(28255),S=n(30671),b=n(71948),q=n(23267),W=n(77775),D=n(44466),B=n(56709),L=n(98739),Y=n(73162),z=n(96308),j=n(10266),$=n(65412);const X=[{path:"",component:G}];let ee=(()=>{class i{static#e=this.\u0275fac=function(s){return new(s||i)};static#t=this.\u0275mod=e.oAB({type:i});static#a=this.\u0275inj=e.cJS({imports:[o.u5,h.ot,p.lN,u.Ps,f.c,o.u5,o.UX,y.J,A.Tx,o.u5,S.p0,h.ot,p.lN,u.Ps,f.c,b.Fk,T.LD,q.SJ,Z.rP,W.fC,D.m,h.ot,p.lN,u.Ps,f.c,o.u5,o.UX,y.J,A.Tx,o.u5,S.p0,N.ez,u.Ps,p.lN,h.ot,p.lN,u.Ps,f.c,o.u5,o.UX,y.J,A.Tx,T.LD,u.Ps,B.p9,h.ot,B.p9,p.lN,u.Ps,f.c,A.Tx,L.TU,Y.Cv,P.si,z.JX,T.LD,Z.rP,j.AV,D.m,$.Is,c.Bz.forChild(X)]})}return i})()},70487:(F,g,n)=>{n.d(g,{c:()=>c});class c{constructor(v,C,d){this.title=v,this.text=C,this.icon=d}}}}]);