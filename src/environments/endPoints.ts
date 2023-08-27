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
        createCustomers: 'vet/Customers/CreateCustomer',
        animalsTypeList : 'vet/Customers/VetAnimalsTypeList',
        animalBreedsDefList : 'vet/Customers/AnimalBreedsDefList',
    },
    productdescription:{
        productdescriptionList: 'vet/Definition/ProductDescriptionList',
        createProductDescriptions : 'vet/Definition/CreateProductDescription',
        updateProductDescriptions : 'vet/Definition/UpdateProductDescription',
        deleteProductDescriptions : 'vet/Definition/DeleteProductDescription',
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
    }


}