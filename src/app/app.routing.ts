import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { 
        path: '', 
        pathMatch: 'full', 
        redirectTo: 'auth/sign-in' 
    },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
     { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards' },

    // Auth routes for guests
    {
        path: 'auth',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Landing routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty',
    //     },
    //     children: [
    //         {
    //             path: 'home',
    //             loadChildren: () =>
    //                 import('app/modules/landing/home/home.module').then(
    //                     (m) => m.LandingHomeModule
    //                 ),
    //         },
    //         {
    //             path: 'customer',
    //             loadChildren: () =>
    //                 import('app/modules/admin/customer/customer.module').then(
    //                     (m) => m.CustomerModule
    //                 ),
    //         },
    //     ],
    // },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboards',
                loadChildren: () =>
                    import('app/modules/admin/dashboards/dashboards.module').then(
                        (m) => m.DashboardsModule
                    ),
            },
            {
                path: 'customerlist',
                loadChildren: () =>
                    import('app/modules/admin/customer/customerlist/customerlist.module').then(
                        (m) => m.CustomerListModule
                    ),
            },
            {
                path: 'customeradd',
                loadChildren: () =>
                    import('app/modules/admin/customer/customeradd/customeradd.module').then(
                        (m) => m.CustomeraddModule
                    ),
            },
            {
                path: 'appointment',
                loadChildren: () =>
                    import('app/modules/admin/appointment/appointment.module').then(
                        (m) => m.AppointmentModule
                    ),
            },
            {
                path: 'sales',
                loadChildren: () =>
                    import('app/modules/admin/retail/sales/sales.module').then(
                        (m) => m.SalesModule
                    ),
            },
            {
                path: 'buying',
                loadChildren: () =>
                    import('app/modules/admin/retail/buying/buying.module').then(
                        (m) => m.BuyingModule
                    ),
            },
            {
                path: 'lab',
                loadChildren: () =>
                    import('app/modules/admin/lab/lab.module').then(
                        (m) => m.LabModule
                    ),
            },
            {
                path: 'cashtransactions',
                loadChildren: () =>
                    import('app/modules/admin/cashing/cashtransactions/cashtransactions.module').then(
                        (m) => m.CashTransactionsModule
                    ),
            },
            {
                path: 'checkportfolio',
                loadChildren: () =>
                    import('app/modules/admin/cashing/checkportfolio/checkportfolio.module').then(
                        (m) => m.CheckportfolioModule
                    ),
            },
            {
                path: 'productdescription',
                loadChildren: () =>
                    import('app/modules/admin/definition/productdescription/productdescription.module').then(
                        (m) => m.ProductdescriptionModule
                    ),
            },
            {
                path: 'vaccinedefinition',
                loadChildren: () =>
                    import('app/modules/admin/definition/vaccinedefinition/vaccinedefinition.module').then(
                        (m) => m.VaccinedefinitionModule
                    ),
            },
            {
                path: 'suppliers',
                loadChildren: () =>
                    import('app/modules/admin/suppliers/suppliers.module').then(
                        (m) => m.SuppliersModule
                    ),
            },
            {
                path: 'agenda',
                loadChildren: () =>
                    import('app/modules/admin/agenda/agenda.module').then(
                        (m) => m.AgendaModule
                    ),
            },
            {
                path: 'store',
                loadChildren: () =>
                    import('app/modules/admin/store/store.module').then(
                        (m) => m.StoreModule
                    ),
            },
            {
                path: 'clinicalstatistics',
                loadChildren: () =>
                    import('app/modules/admin/clinicalstatistics/clinicalstatistics.module').then(
                        (m) => m.ClinicalstatisticsModule
                    ),
            },
            {
                path: 'reports',
                loadChildren: () =>
                    import('app/modules/admin/reports/reports.module').then(
                        (m) => m.ReportsModule
                    ),
            },
            {
                path: 'sms',
                loadChildren: () =>
                    import('app/modules/admin/sms/sms.module').then(
                        (m) => m.SmsModule
                    ),
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('app/modules/admin/settings/users/users.module').then(
                        (m) => m.UsersModule
                    ),
            },
            {
                path: 'parameters',
                loadChildren: () =>
                    import('app/modules/admin/settings/parameters/parameters.module').then(
                        (m) => m.ParametersModule
                    ),
            },
            {
                path: 'smsparameters',
                loadChildren: () =>
                    import('app/modules/admin/settings/smsparameters/smsparameters.module').then(
                        (m) => m.SmsparametersModule
                    ),
            },
            {
                path: 'casingdefinition',
                loadChildren: () =>
                    import('app/modules/admin/definition/casingdefinition/casingdefinition.module').then(
                        (m) => m.CasingdefinitionModule
                    ),
            },
            {
                path: 'unitdefinition',
                loadChildren: () =>
                    import('app/modules/admin/definition/unitdefinition/unitdefinition.module').then(
                        (m) => m.UnitDefinitionModule
                    ),
            },
            {
                path: 'productcategory',
                loadChildren: () =>
                    import('app/modules/admin/definition/productcategory/productcategory.module').then(
                        (m) => m.ProductcategoryModule
                    ),
            },
        ],
    },
];
