"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[2883],{9602:(C,_,i)=>{i.d(_,{y:()=>n});var e=i(1281),f=i(8288),t=i(4650),u=i(6895);function v(g,c){1&g&&(t.ynx(0),t.TgZ(1,"div",1),t.Hsn(2),t.qZA(),t.TgZ(3,"div",2),t.Hsn(4,1),t.qZA(),t.BQk())}function w(g,c){1&g&&(t.TgZ(0,"div",4),t.Hsn(1,3),t.qZA()),2&g&&t.Q6J("@expandCollapse",void 0)}function x(g,c){if(1&g&&(t.ynx(0),t.Hsn(1,2),t.YNc(2,w,2,1,"div",3),t.BQk()),2&g){const r=t.oxw();t.xp6(2),t.Q6J("ngIf",r.expanded)}}const b=[[["","fuseCardFront",""]],[["","fuseCardBack",""]],"*",[["","fuseCardExpansion",""]]];class n{constructor(){this.expanded=!1,this.face="front",this.flippable=!1}get classList(){return{"fuse-card-expanded":this.expanded,"fuse-card-face-back":this.flippable&&"back"===this.face,"fuse-card-face-front":this.flippable&&"front"===this.face,"fuse-card-flippable":this.flippable}}ngOnChanges(c){"expanded"in c&&(this.expanded=(0,e.Ig)(c.expanded.currentValue)),"flippable"in c&&(this.flippable=(0,e.Ig)(c.flippable.currentValue))}}n.\u0275fac=function(c){return new(c||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["fuse-card"]],hostVars:2,hostBindings:function(c,r){2&c&&t.Tol(r.classList)},inputs:{expanded:"expanded",face:"face",flippable:"flippable"},exportAs:["fuseCard"],features:[t.TTD],ngContentSelectors:["[fuseCardFront]","[fuseCardBack]","*","[fuseCardExpansion]"],decls:2,vars:2,consts:[[4,"ngIf"],[1,"fuse-card-front"],[1,"fuse-card-back"],["class","fuse-card-expansion",4,"ngIf"],[1,"fuse-card-expansion"]],template:function(c,r){1&c&&(t.F$t(b),t.YNc(0,v,5,0,"ng-container",0),t.YNc(1,x,3,1,"ng-container",0)),2&c&&(t.Q6J("ngIf",r.flippable),t.xp6(1),t.Q6J("ngIf",!r.flippable))},dependencies:[u.O5],styles:["fuse-card{position:relative;display:flex;overflow:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable{border-radius:0;overflow:visible;transform-style:preserve-3d;transition:transform 1s;perspective:600px;background:transparent;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-front{visibility:hidden;opacity:0;transform:rotateY(180deg)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-back{visibility:visible;opacity:1;transform:rotateY(360deg)}fuse-card.fuse-card-flippable .fuse-card-front,fuse-card.fuse-card-flippable .fuse-card-back{display:flex;flex-direction:column;flex:1 1 auto;z-index:10;transition:transform .5s ease-out 0s,visibility 0s ease-in .2s,opacity 0s ease-in .2s;-webkit-backface-visibility:hidden;backface-visibility:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable .fuse-card-front{position:relative;opacity:1;visibility:visible;transform:rotateY(0);overflow:hidden}fuse-card.fuse-card-flippable .fuse-card-back{position:absolute;inset:0;opacity:0;visibility:hidden;transform:rotateY(180deg);overflow:hidden auto}\n"],encapsulation:2,data:{animation:f.L}})},5804:(C,_,i)=>{i.d(_,{J:()=>u}),i(9602);var f=i(6895),t=i(4650);class u{}u.\u0275fac=function(w){return new(w||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[f.ez]})},2883:(C,_,i)=>{i.r(_),i.d(_,{AuthForgotPasswordModule:()=>y});var e=i(9299),f=i(4859),t=i(9549),u=i(7392),v=i(284),w=i(1572),x=i(5804),b=i(7775),k=i(4466),n=i(4006),g=i(8746),c=i(8288),r=i(4650),T=i(7990),a=i(8214),h=i(6895);const o=["forgotPasswordNgForm"];function s(m,l){if(1&m&&(r.TgZ(0,"fuse-alert",36),r._uU(1),r.qZA()),2&m){const p=r.oxw();r.Q6J("appearance","outline")("showIcon",!1)("type",p.alert.type)("@shake","error"===p.alert.type),r.xp6(1),r.hij(" ",p.alert.message," ")}}function d(m,l){1&m&&(r.TgZ(0,"mat-error"),r._uU(1," Email address is required "),r.qZA())}function Z(m,l){1&m&&(r.TgZ(0,"mat-error"),r._uU(1," Please enter a valid email address "),r.qZA())}function F(m,l){1&m&&(r.TgZ(0,"span"),r._uU(1," Send reset link "),r.qZA())}function M(m,l){1&m&&r._UZ(0,"mat-progress-spinner",37),2&m&&r.Q6J("diameter",24)("mode","indeterminate")}const O=function(){return["/sign-in"]};class A{constructor(l,p){this._authService=l,this._formBuilder=p,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.forgotPasswordForm=this._formBuilder.group({email:["",[n.kI.required,n.kI.email]]})}sendResetLink(){this.forgotPasswordForm.invalid||(this.forgotPasswordForm.disable(),this.showAlert=!1,this._authService.forgotPassword(this.forgotPasswordForm.get("email").value).pipe((0,g.x)(()=>{this.forgotPasswordForm.enable(),this.forgotPasswordNgForm.resetForm(),this.showAlert=!0})).subscribe(l=>{this.alert={type:"success",message:"Password reset sent! You'll receive an email if you are registered on our system."}},l=>{this.alert={type:"error",message:"Email does not found! Are you sure you are already a member?"}}))}}A.\u0275fac=function(l){return new(l||A)(r.Y36(T.e),r.Y36(n.QS))},A.\u0275cmp=r.Xpm({type:A,selectors:[["auth-forgot-password"]],viewQuery:function(l,p){if(1&l&&r.Gf(o,5),2&l){let P;r.iGM(P=r.CRH())&&(p.forgotPasswordNgForm=P.first)}},decls:52,vars:11,consts:[[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],[1,"mt-0.5","font-medium"],["class","mt-8",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["forgotPasswordNgForm","ngForm"],[1,"w-full"],["id","email","matInput","",3,"formControlName"],[4,"ngIf"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-3",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],[1,"relative","hidden","md:flex","flex-auto","items-center","justify-center","w-1/2","h-full","p-16","lg:px-28","overflow-hidden","bg-gray-800","dark:border-l"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"z-10","relative","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","tracking-tight","leading-6","text-gray-400"],[1,"flex","items-center","mt-8"],[1,"flex","flex-0","items-center","-space-x-1.5"],["src","assets/images/avatars/female-18.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/female-11.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-09.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-16.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],[1,"ml-4","font-medium","tracking-tight","text-gray-400"],[1,"mt-8",3,"appearance","showIcon","type"],[3,"diameter","mode"]],template:function(l,p){1&l&&(r.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),r._UZ(4,"img",4),r.qZA(),r.TgZ(5,"div",5),r._uU(6,"Forgot password?"),r.qZA(),r.TgZ(7,"div",6),r._uU(8,"Fill the form to reset your password"),r.qZA(),r.YNc(9,s,2,5,"fuse-alert",7),r.TgZ(10,"form",8,9)(12,"mat-form-field",10)(13,"mat-label"),r._uU(14,"Email address"),r.qZA(),r._UZ(15,"input",11),r.YNc(16,d,2,0,"mat-error",12),r.YNc(17,Z,2,0,"mat-error",12),r.qZA(),r.TgZ(18,"button",13),r.NdJ("click",function(){return p.sendResetLink()}),r.YNc(19,F,2,0,"span",12),r.YNc(20,M,1,2,"mat-progress-spinner",14),r.qZA(),r.TgZ(21,"div",15)(22,"span"),r._uU(23,"Return to"),r.qZA(),r.TgZ(24,"a",16),r._uU(25,"sign in "),r.qZA()()()()(),r.TgZ(26,"div",17),r.O4$(),r.TgZ(27,"svg",18)(28,"g",19),r._UZ(29,"circle",20)(30,"circle",21),r.qZA()(),r.TgZ(31,"svg",22)(32,"defs")(33,"pattern",23),r._UZ(34,"rect",24),r.qZA()(),r._UZ(35,"rect",25),r.qZA(),r.kcU(),r.TgZ(36,"div",26)(37,"div",27)(38,"div"),r._uU(39,"Welcome to"),r.qZA(),r.TgZ(40,"div"),r._uU(41,"our community"),r.qZA()(),r.TgZ(42,"div",28),r._uU(43," Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. "),r.qZA(),r.TgZ(44,"div",29)(45,"div",30),r._UZ(46,"img",31)(47,"img",32)(48,"img",33)(49,"img",34),r.qZA(),r.TgZ(50,"div",35),r._uU(51,"More than 17k people joined us, it's your turn"),r.qZA()()()()()),2&l&&(r.xp6(9),r.Q6J("ngIf",p.showAlert),r.xp6(1),r.Q6J("formGroup",p.forgotPasswordForm),r.xp6(5),r.Q6J("formControlName","email"),r.xp6(1),r.Q6J("ngIf",p.forgotPasswordForm.get("email").hasError("required")),r.xp6(1),r.Q6J("ngIf",p.forgotPasswordForm.get("email").hasError("email")),r.xp6(1),r.Q6J("color","primary")("disabled",p.forgotPasswordForm.disabled),r.xp6(1),r.Q6J("ngIf",!p.forgotPasswordForm.disabled),r.xp6(1),r.Q6J("ngIf",p.forgotPasswordForm.disabled),r.xp6(4),r.Q6J("routerLink",r.DdM(10,O)))},dependencies:[e.rH,f.lW,t.KE,t.hX,t.TO,v.Nt,w.Ou,a.W,h.O5,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u],encapsulation:2,data:{animation:c.L}});const E=[{path:"",component:A}];class y{}y.\u0275fac=function(l){return new(l||y)},y.\u0275mod=r.oAB({type:y}),y.\u0275inj=r.cJS({imports:[e.Bz.forChild(E),f.ot,t.lN,u.Ps,v.c,w.Cq,x.J,b.fC,k.m]})},1572:(C,_,i)=>{i.d(_,{Cq:()=>T,Ou:()=>c});var e=i(4650),f=i(3238),t=i(1281),u=i(6895);const v=["determinateSpinner"];function w(a,h){if(1&a&&(e.O4$(),e.TgZ(0,"svg",11),e._UZ(1,"circle",12),e.qZA()),2&a){const o=e.oxw();e.uIk("viewBox",o._viewBox()),e.xp6(1),e.Udp("stroke-dasharray",o._strokeCircumference(),"px")("stroke-dashoffset",o._strokeCircumference()/2,"px")("stroke-width",o._circleStrokeWidth(),"%"),e.uIk("r",o._circleRadius())}}const x=(0,f.pj)(class{constructor(a){this._elementRef=a}},"primary"),b=new e.OlP("mat-progress-spinner-default-options",{providedIn:"root",factory:function k(){return{diameter:n}}}),n=100;let c=(()=>{class a extends x{constructor(o,s,d){super(o),this.mode="mat-spinner"===this._elementRef.nativeElement.nodeName.toLowerCase()?"indeterminate":"determinate",this._value=0,this._diameter=n,this._noopAnimations="NoopAnimations"===s&&!!d&&!d._forceAnimations,d&&(d.color&&(this.color=this.defaultColor=d.color),d.diameter&&(this.diameter=d.diameter),d.strokeWidth&&(this.strokeWidth=d.strokeWidth))}get value(){return"determinate"===this.mode?this._value:0}set value(o){this._value=Math.max(0,Math.min(100,(0,t.su)(o)))}get diameter(){return this._diameter}set diameter(o){this._diameter=(0,t.su)(o)}get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(o){this._strokeWidth=(0,t.su)(o)}_circleRadius(){return(this.diameter-10)/2}_viewBox(){const o=2*this._circleRadius()+this.strokeWidth;return`0 0 ${o} ${o}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return"determinate"===this.mode?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}}return a.\u0275fac=function(o){return new(o||a)(e.Y36(e.SBq),e.Y36(e.QbO,8),e.Y36(b))},a.\u0275cmp=e.Xpm({type:a,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(o,s){if(1&o&&e.Gf(v,5),2&o){let d;e.iGM(d=e.CRH())&&(s._determinateCircle=d.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:12,hostBindings:function(o,s){2&o&&(e.uIk("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow","determinate"===s.mode?s.value:null)("mode",s.mode),e.Udp("width",s.diameter,"px")("height",s.diameter,"px"),e.ekj("_mat-animation-noopable",s._noopAnimations)("mdc-circular-progress--indeterminate","indeterminate"===s.mode))},inputs:{color:"color",mode:"mode",value:"value",diameter:"diameter",strokeWidth:"strokeWidth"},exportAs:["matProgressSpinner"],features:[e.qOj],decls:14,vars:11,consts:[["circle",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["determinateSpinner",""],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(o,s){if(1&o&&(e.YNc(0,w,2,8,"ng-template",null,0,e.W1O),e.TgZ(2,"div",1,2),e.O4$(),e.TgZ(4,"svg",3),e._UZ(5,"circle",4),e.qZA()(),e.kcU(),e.TgZ(6,"div",5)(7,"div",6)(8,"div",7),e.GkF(9,8),e.qZA(),e.TgZ(10,"div",9),e.GkF(11,8),e.qZA(),e.TgZ(12,"div",10),e.GkF(13,8),e.qZA()()()),2&o){const d=e.MAs(1);e.xp6(4),e.uIk("viewBox",s._viewBox()),e.xp6(1),e.Udp("stroke-dasharray",s._strokeCircumference(),"px")("stroke-dashoffset",s._strokeDashOffset(),"px")("stroke-width",s._circleStrokeWidth(),"%"),e.uIk("r",s._circleRadius()),e.xp6(4),e.Q6J("ngTemplateOutlet",d),e.xp6(2),e.Q6J("ngTemplateOutlet",d),e.xp6(2),e.Q6J("ngTemplateOutlet",d)}},dependencies:[u.tP],styles:["@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;line-height:0;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}.mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, transparent)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-1 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-2 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-3 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-4 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}"],encapsulation:2,changeDetection:0}),a})(),T=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[u.ez,f.BQ]}),a})()}}]);