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
        complateactivation: 'identityserver/api/account/complateactivation'
    },
    customers:{
        customerslist: 'vet/Customers/CustomersList',
        createCustomers: 'vet/Customers/CreateCustomer'
    },
    productdescription:{
        productdescriptionList: 'vet/Definition/ProductDescriptionList',
    },
    productcategory: {
        productcategoryList: 'vet/Definition/ProductCategoryList',
        createProductCategory : 'vet/Definition/CreateProductCategories'
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
        createCustomerGroupDef : 'vet/Definition/CreateCustomerGroupDef'
    },
    store:{
        storeList : 'vet/Store/StoreList',
        createStore: 'vet/Store/CreateStore',
        updateStore : 'vet/Store/UpdateStore',
        deleteStore : 'vet/Store/DeleteStore'
    }


}