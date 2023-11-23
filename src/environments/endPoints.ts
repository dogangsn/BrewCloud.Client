export const endPoints = { 
    auth: {
        forgotPassword: 'api/auth/forgot-password',
        resetPassword: 'api/auth/reset-password',
        signIn: 'identityserver/connect/token',
        signInUsingToken: 'api/auth/sign-in-with-token',
        signUp: 'identityserver/api/user/SignUp',
        unlockSession: 'api/auth/unlock-session',
    },
    account :{
        createaccount: 'identityserver/api/account/create',
        complateactivation: 'identityserver/api/account/complateactivation',
        refreshactivation  : 'identityserver/api/account/RefreshActivation'
    },
    settings : {
        getUsersList: 'account/settings/GetUsersList',
        getCompany: 'account/settings/GetCompany',
        updateCompany: 'account/settings/UpdateCompany',
        createUsers: 'account/settings/CreateUser',
        updateUsers: 'account/settings/UpdateUser',
        getRolsSettings: 'account/settings/GetRoleSettingList',
        createRols : 'account/settings/CreateRoleSetting',
        updateRols : 'account/settings/UpdateRoleSetting',
        deleteRols : 'account/settings/DeleteRoleSetting',
        getNavigation : 'account/settings/GetNavigation'
    },
    customers:{
        customerslist: 'vet/Customers/CustomersList',
        createCustomers: 'vet/Customers/CreateCustomer',
        deleteCustomer : 'vet/Customers/DeleteCustomer',
        animalsTypeList : 'vet/Customers/VetAnimalsTypeList',
        animalBreedsDefList : 'vet/Customers/AnimalBreedsDefList',
        getCustomersFindById: 'vet/Customers/GetCustomersFindById',
        updateCustomerById: 'vet/Customers/UpdateCustomerById'
    },
    productdescription:{
        productdescriptionList: 'vet/Definition/ProductDescriptionList',
        createProductDescriptions : 'vet/Definition/CreateProductDescription',
        updateProductDescriptions : 'vet/Definition/UpdateProductDescription',
        deleteProductDescriptions : 'vet/Definition/DeleteProductDescription',
        productDescriptionFilters: 'vet/Definition/ProductDescriptionFilters',
    },
    productcategory: {
        productcategoryList: 'vet/Definition/ProductCategoryList',
        createProductCategory : 'vet/Definition/CreateProductCategories',
        updateProductCategory : 'vet/Definition/UpdateProductCategories',
        deleteProductCategory : 'vet/Definition/DeleteProductCategories',
    },
    units : {
        unitsList : 'vet/Definition/UnitsList',
        createUnits : 'vet/Definition/CreateUnits'
    },
    casedefinition : {
        casedefinitionList : 'vet/Definition/CasingDefinitionList',
        Createcasedefinition : 'vet/Definition/CreateCasingDefinition',
        Updatecasedefinition : 'vet/Definition/UpdateCasingDefinition',
        Deletecasedefinition : 'vet/Definition/DeleteCasingDefinition'
    },
    customergroup : {
        customerGroupList: 'vet/Definition/CustomerGroupList',
        createCustomerGroupDef : 'vet/Definition/CreateCustomerGroupDef',
        updateCustomerGroupDef : 'vet/Definition/UpdateCustomerGroupDef',
        deleteCustomerGroupDef : 'vet/Definition/DeleteCustomerGroupDef',
   
    },
    store:{
        storeList : 'vet/Store/StoreList',
        createStore: 'vet/Store/CreateStore',
        updateStore : 'vet/Store/UpdateStore',
        deleteStore : 'vet/Store/DeleteStore'
    },
    suppliers : {
        suppliersList : 'vet/Suppliers/SuppliersList',
        Createsuppliers : 'vet/Suppliers/CreateSuppliers',
        Updatesuppliers : 'vet/Suppliers/UpdateSuppliers',
        Deletesuppliers : 'vet/Suppliers/DeleteSuppliers'
    },
    animalColorsDef: {
        animalColorsDefList : "vet/Definition/AnimalColorsDefList"
    },
    saleBuy: {
        createSaleBuy : "vet/SaleBuy/CreateSaleBuy",
        saleBuyList : "vet/SaleBuy/SaleBuyList",
        saleBuyFilter : 'vet/SaleBuy/SaleBuyListFilter',
        deleteSaleBuy: 'vet/SaleBuy/DeleteSaleBuy'
    },
    paymentmethods : {
        paymentmethodsList : 'vet/Definition/PaymentMethodList',
        createPaymentMethods: 'vet/Definition/CreatePaymentMethods',
        updatePaymentMethods: 'vet/Definition/UpdatePaymentMethods',
        deletePaymentMethods: 'vet/Definition/DeletePaymentMethods',
    },
    agenda : {
        agendaList : 'vet/Agenda/AgendaList',
        agendaListById : 'vet/Agenda/AgendaListById',
        Createagenda : 'vet/Agenda/CreateAgenda',
        Updateagenda : 'vet/Agenda/UpdateAgenda',
        Deleteagenda : 'vet/Agenda/DeleteAgenda'
    },
    demandproducts : {
        demandproductsList : 'vet/Demands/DemandProductsList',
        Createdemandproducts : 'vet/Demands/CreateDemandProducts',
        Updatedemandproducts : 'vet/Demands/UpdateDemandProducts',
        Deletedemandproducts : 'vet/Demands/DeleteDemandProducts'
    },
    demands : {
        demandsList : 'vet/Demands/DemandList',
        createdemand : 'vet/Demands/CreateDemand',
        updatedemand : 'vet/Demands/UpdateDemand',
        deletedemand : 'vet/Demands/DeleteDemand',
        updatebuydemands:'vet/Demands/UpdateDemandIsBuying'
    },
    demandTrans : {
        demandsTransList : 'vet/Demands/DemandTransList',
    },
    demandComplate : {
        demandsComplateList : 'vet/Demands/DemandComplatedList'
    },
    lab : {
        customersLabList : 'vet/lab/CustomersLabList'
    },
    parameters : {
        parametersList : 'vet/Settings/ParametersList',
        updateparameters : 'vet/Settings/UpdateParameters',
    },
    chat:{
        getAllUsers: 'chat/Account/GetAllUsers'
    },
    appointments : {
        appointmensList : 'vet/Appointment/AppointmentsList',
        createappointment : 'vet/Appointment/CreateAppointment',
        deleteappointment : 'vet/Appointment/DeleteAppointment',
        updateappointment : 'vet/Appointment/UpdateAppointmentById'
    }
}