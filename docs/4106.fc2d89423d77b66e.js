"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[4106],{4106:($,u,e)=>{e.r(u),e.d(u,{DashboardsModule:()=>i});var h=e(9299),g=e(7579),v=e(2722),t=e(4650),x=e(1135),f=e(8505),b=e(529);class a{constructor(s){this._httpClient=s,this._data=new x.X(null)}get data$(){return this._data.asObservable()}getData(){return this._httpClient.get("api/dashboards/project").pipe((0,f.b)(s=>{this._data.next(s)}))}}a.\u0275fac=function(s){return new(s||a)(t.LFG(b.eN))},a.\u0275prov=t.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"});var d=e(7392),m=e(4859),l=e(8255);class n{constructor(s){this._projectService=s,this.chartGithubIssues={},this.chartTaskDistribution={},this.chartBudgetDistribution={},this.chartWeeklyExpenses={},this.chartMonthlyExpenses={},this.chartYearlyExpenses={},this._unsubscribeAll=new g.x}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}ngOnInit(){this._projectService.data$.pipe((0,v.R)(this._unsubscribeAll)).subscribe(s=>{this.data=s,this._prepareChartData()})}trackByFn(s,c){return c.id||s}_prepareChartData(){this.chartGithubIssues={chart:{fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"line",toolbar:{show:!1},zoom:{enabled:!1}},colors:["#64748B","#94A3B8"],dataLabels:{enabled:!0,enabledOnSeries:[0],background:{borderWidth:0}},grid:{borderColor:"var(--fuse-border)"},labels:this.data.githubIssues.labels,legend:{show:!1},plotOptions:{bar:{columnWidth:"50%"}},series:this.data.githubIssues.series,states:{hover:{filter:{type:"darken",value:.75}}},stroke:{width:[3,0]},tooltip:{followCursor:!0,theme:"dark"},xaxis:{axisBorder:{show:!1},axisTicks:{color:"var(--fuse-border)"},labels:{style:{colors:"var(--fuse-text-secondary)"}},tooltip:{enabled:!1}},yaxis:{labels:{offsetX:-16,style:{colors:"var(--fuse-text-secondary)"}}}},this.chartTaskDistribution={chart:{fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"polarArea",toolbar:{show:!1},zoom:{enabled:!1}},labels:this.data.taskDistribution.labels,legend:{position:"bottom"},plotOptions:{polarArea:{spokes:{connectorColors:"var(--fuse-border)"},rings:{strokeColor:"var(--fuse-border)"}}},series:this.data.taskDistribution.series,states:{hover:{filter:{type:"darken",value:.75}}},stroke:{width:2},theme:{monochrome:{enabled:!0,color:"#93C5FD",shadeIntensity:.75,shadeTo:"dark"}},tooltip:{followCursor:!0,theme:"dark"},yaxis:{labels:{style:{colors:"var(--fuse-text-secondary)"}}}},this.chartBudgetDistribution={chart:{fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"radar",sparkline:{enabled:!0}},colors:["#818CF8"],dataLabels:{enabled:!0,formatter:s=>`${s}%`,textAnchor:"start",style:{fontSize:"13px",fontWeight:500},background:{borderWidth:0,padding:4},offsetY:-15},markers:{strokeColors:"#818CF8",strokeWidth:4},plotOptions:{radar:{polygons:{strokeColors:"var(--fuse-border)",connectorColors:"var(--fuse-border)"}}},series:this.data.budgetDistribution.series,stroke:{width:2},tooltip:{theme:"dark",y:{formatter:s=>`${s}%`}},xaxis:{labels:{show:!0,style:{fontSize:"12px",fontWeight:"500"}},categories:this.data.budgetDistribution.categories},yaxis:{max:s=>parseInt((s+10).toFixed(0),10),tickAmount:7}},this.chartWeeklyExpenses={chart:{animations:{enabled:!1},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"line",sparkline:{enabled:!0}},colors:["#22D3EE"],series:this.data.weeklyExpenses.series,stroke:{curve:"smooth"},tooltip:{theme:"dark"},xaxis:{type:"category",categories:this.data.weeklyExpenses.labels},yaxis:{labels:{formatter:s=>`$${s}`}}},this.chartMonthlyExpenses={chart:{animations:{enabled:!1},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"line",sparkline:{enabled:!0}},colors:["#4ADE80"],series:this.data.monthlyExpenses.series,stroke:{curve:"smooth"},tooltip:{theme:"dark"},xaxis:{type:"category",categories:this.data.monthlyExpenses.labels},yaxis:{labels:{formatter:s=>`$${s}`}}},this.chartYearlyExpenses={chart:{animations:{enabled:!1},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"line",sparkline:{enabled:!0}},colors:["#FB7185"],series:this.data.yearlyExpenses.series,stroke:{curve:"smooth"},tooltip:{theme:"dark"},xaxis:{type:"category",categories:this.data.yearlyExpenses.labels},yaxis:{labels:{formatter:s=>`$${s}`}}}}}n.\u0275fac=function(s){return new(s||n)(t.Y36(a))},n.\u0275cmp=t.Xpm({type:n,selectors:[["dashboards"]],decls:88,vars:8,consts:[[1,"flex","flex-col","flex-auto","w-full"],[1,"flex","flex-wrap","w-full","max-w-screen-xl","mx-auto","p-6","md:p-8"],[1,"grid","grid-cols-1","sm:grid-cols-2","md:grid-cols-4","gap-6","w-full","min-w-0"],[1,"flex","flex-col","flex-auto","p-6","bg-card","shadow","rounded-2xl","overflow-hidden"],[1,"flex","items-start","justify-between"],[1,"text-lg","font-medium","tracking-tight","leading-6","truncate"],[1,"ml-2","-mt-2","-mr-3"],["mat-icon-button","",3,"matMenuTriggerFor"],[1,"icon-size-5",3,"svgIcon"],["summaryMenu","matMenu"],["mat-menu-item",""],[1,"flex","flex-col","items-center","mt-2"],[1,"text-7xl","sm:text-8xl","font-bold","tracking-tight","leading-none","text-blue-500"],[1,"text-lg","font-medium","text-blue-600","dark:text-blue-500"],[1,"flex","items-baseline","justify-center","w-full","mt-5","text-secondary"],[1,"text-md","font-medium","truncate"],[1,"ml-1.5","text-lg","font-semibold"],["overdueMenu","matMenu"],[1,"text-7xl","sm:text-8xl","font-bold","tracking-tight","leading-none","text-red-500"],[1,"text-lg","font-medium","text-red-600","dark:text-red-500"],["issuesMenu","matMenu"],[1,"text-7xl","sm:text-8xl","font-bold","tracking-tight","leading-none","text-amber-500"],[1,"text-lg","font-medium","text-amber-600","dark:text-amber-500"],["featuresMenu","matMenu"],[1,"text-7xl","sm:text-8xl","font-bold","tracking-tight","leading-none","text-green-500"],[1,"text-lg","font-medium","text-green-600","dark:text-green-500"],[1,"grid","grid-cols-1","sm:grid-cols-6","gap-6","w-full","min-w-0"],[1,"sm:col-span-6","flex","flex-col","flex-auto","p-6","bg-card","shadow","rounded-2xl","overflow-hidden"],[1,"flex","flex-col","flex-auto","mt-2","overflow-x-auto"]],template:function(s,c){if(1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),t._uU(6,"G\xfcnl\xfck Eklenen Randevu"),t.qZA(),t.TgZ(7,"div",6)(8,"button",7),t._UZ(9,"mat-icon",8),t.qZA(),t.TgZ(10,"mat-menu",null,9)(12,"button",10),t._uU(13,"Yesterday"),t.qZA()()()(),t.TgZ(14,"div",11)(15,"div",12),t._uU(16,"0"),t.qZA(),t.TgZ(17,"div",13),t._uU(18,"Randevu"),t.qZA(),t.TgZ(19,"div",14)(20,"div",15),t._uU(21,"Tamamlanan:"),t.qZA(),t.TgZ(22,"div",16),t._uU(23,"0"),t.qZA()()()(),t.TgZ(24,"div",3)(25,"div",4)(26,"div",5),t._uU(27,"G\xfcnl\xfck Yeni M\xfc\u015fteri"),t.qZA(),t.TgZ(28,"div",6)(29,"button",7),t._UZ(30,"mat-icon",8),t.qZA(),t.TgZ(31,"mat-menu",null,17)(33,"button",10),t._uU(34,"Yesterday"),t.qZA()()()(),t.TgZ(35,"div",11)(36,"div",18),t._uU(37,"0"),t.qZA(),t.TgZ(38,"div",19),t._uU(39,"M\xfc\u015fteri"),t.qZA(),t.TgZ(40,"div",14)(41,"div",15),t._uU(42,"From yesterday:"),t.qZA(),t.TgZ(43,"div",16),t._uU(44,"0"),t.qZA()()()(),t.TgZ(45,"div",3)(46,"div",4)(47,"div",5),t._uU(48,"G\xfcnl\xfck Ciro"),t.qZA(),t.TgZ(49,"div",6)(50,"button",7),t._UZ(51,"mat-icon",8),t.qZA(),t.TgZ(52,"mat-menu",null,20)(54,"button",10),t._uU(55,"Yesterday"),t.qZA()()()(),t.TgZ(56,"div",11)(57,"div",21),t._uU(58,"0.00"),t.qZA(),t.TgZ(59,"div",22),t._uU(60,"\u20ba"),t.qZA(),t.TgZ(61,"div",14)(62,"div",15),t._uU(63,"Yesterday:"),t.qZA(),t.TgZ(64,"div",16),t._uU(65,"0.00 \u20ba"),t.qZA()()()(),t.TgZ(66,"div",3)(67,"div",4)(68,"div",5),t._uU(69,"Toplam Stok De\u011feri"),t.qZA(),t.TgZ(70,"div",6)(71,"button",7),t._UZ(72,"mat-icon",8),t.qZA(),t.TgZ(73,"mat-menu",null,23)(75,"button",10),t._uU(76,"Yesterday"),t.qZA()()()(),t.TgZ(77,"div",11)(78,"div",24),t._uU(79,"0.00"),t.qZA(),t.TgZ(80,"div",25),t._uU(81,"\u20ba"),t.qZA()()()()(),t.TgZ(82,"div",1)(83,"div",26)(84,"div",27)(85,"div",5),t._uU(86,"Yakla\u015fan Randevular"),t.qZA(),t._UZ(87,"div",28),t.qZA()()()()),2&s){const S=t.MAs(11),J=t.MAs(32),Y=t.MAs(53),j=t.MAs(74);t.xp6(8),t.Q6J("matMenuTriggerFor",S),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:dots-vertical"),t.xp6(20),t.Q6J("matMenuTriggerFor",J),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:dots-vertical"),t.xp6(20),t.Q6J("matMenuTriggerFor",Y),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:dots-vertical"),t.xp6(20),t.Q6J("matMenuTriggerFor",j),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:dots-vertical")}},dependencies:[d.Hw,m.RK,l.VK,l.OP,l.p6],encapsulation:2});var p=e(6895);const y=[{path:"customerlist",loadChildren:()=>Promise.all([e.e(6709),e.e(4385),e.e(9514),e.e(9602),e.e(6838),e.e(4355),e.e(3806),e.e(2133),e.e(7613)]).then(e.bind(e,7613)).then(o=>o.CustomerListModule)}];class r{}r.\u0275fac=function(s){return new(s||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[p.ez,h.Bz.forChild(y)]});var Z=e(4850),A=e(3162),C=e(3238),T=e(5707),F=e(811),U=e(3267),M=e(6308),k=e(671),D=e(3848),E=e(6205),B=e(4466);const I=[{path:"",component:n}];class i{}i.\u0275fac=function(s){return new(s||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[r,d.Ps,h.Bz.forChild(I),m.ot,F.vV,Z.t,d.Ps,l.Tx,A.Cv,C.si,U.SJ,M.JX,k.p0,D.Nh,E.X,T.y4,B.m]})}}]);