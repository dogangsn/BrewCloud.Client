/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboards',
        title: 'DashBoard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/dashboards'
    },
    {
        id   : 'customer',
        title: 'Müşteri',
        type : 'collapsable',
        icon : 'heroicons_outline:user-group',
        children: [
            {
                id   : 'customeradd',
                title: 'Yeni Müşteri Ekle',
                type : 'basic',
                icon : 'heroicons_outline:user-add',
                link : '/customeradd'
            },
            {
                id   : 'farmclientadd',
                title: 'Yeni Çiftlik Ekle',
                type : 'basic',
                icon : 'pets',
                link : '/farmclientadd'
            },
            {
                id   : 'customerlist',
                title: 'Müşteri Listesi',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/customerlist'
            }
        ]
    },
    {
        id   : 'appointment',
        title: 'Randevu Takvimi',
        type : 'basic',
        icon : 'heroicons_solid:calendar',
        link : '/appointment'
    },
    {
        id   : 'sales',
        title: 'Satış',
        type : 'basic',
        icon : 'heroicons_outline:trending-up',
        link : '/sales'
    },
    {
        id   : 'buying',
        title: 'Alış',
        type : 'basic',
        icon : 'heroicons_outline:trending-down',
        link : '/buying'
    },
    {
        id   : 'lab',
        title: 'Laboratuvar',
        type : 'basic',
        icon : 'heroicons_outline:beaker',
        link : '/lab'
    },
    {
        id   : 'cashing',
        title: 'Kasa İşlemleri',
        type : 'collapsable',
        icon : 'heroicons_outline:cash',
        children: [
            {
                id   : 'cashtransactions',
                title: 'Kasa Hareketleri',
                type : 'basic',
                icon : 'heroicons_outline:switch-vertical',
                link : '/cashtransactions'
            },
            {
                id   : 'checkportfolio',
                title: 'Çek Portföyü',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/checkportfolio'
            }
        ]
        
    },
    {
        id   : 'productvaccidefinition',
        title: 'Ürün / Aşı Tanım',
        type : 'collapsable',
        icon : 'shopping_bag',
        children: [
            {
                id   : 'productdescription',
                title: 'Ürün Tanımı',
                type : 'basic',
                icon : 'mat_outline:production_quantity_limits',
                link : '/productdescription'
            },
            {
                id   : 'vaccinedefinition',
                title: 'Aşı Tanım',
                type : 'basic',
                icon : 'colorize',
                link : '/vaccinedefinition'
            },
        ]
        
    },
    {
        id   : 'demands',
        title: 'Alım Talep',
        type : 'basic',
        icon : 'mat_outline:data_saver_on',
        link : '/demands'
    },
    {
        id   : 'suppliers',
        title: 'Tedarikçiler',
        type : 'basic',
        icon : 'heroicons_outline:truck',
        link : '/suppliers'
    },
    {
        id   : 'agenda',
        title: 'Ajandam',
        type : 'basic',
        icon : 'mat_outline:task_alt',
        link : '/agenda'
    },
    {
        id   : 'store',
        title: 'Depo',
        type : 'basic',
        icon : 'mat_outline:store',
        link : '/store'
    },
    {
        id   : 'reports',
        title: 'Raporlar',
        type : 'basic',
        icon : 'report',
        link : '/reports'
    },
    {
        id   : 'clinicalstatistics',
        title: 'Klinik İstatistikleri',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/clinicalstatistics'
    },
    {
        id   : 'sms',
        title: 'Toplu SMS',
        type : 'basic',
        icon : 'heroicons_outline:phone',
        link : '/sms'
    },
    {
        id   : 'definition',
        title: 'Tanımlamalar',
        type : 'collapsable',
        icon : 'heroicons_outline:collection',
        children: [
            {
                id   : 'casingdefinition',
                title: 'Kasa',
                type : 'basic',
                icon : 'mat_outline:cases',
                link : '/casingdefinition'
            },
            {
                id   : 'unitdefinition',
                title: 'Birim',
                type : 'basic',
                icon : 'heroicons_outline:scale',
                link : '/unitdefinition'
            },
            {
                id   : 'customergroup',
                title: 'Müşteri Grubu',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/customergroup'
            },
            {
                id   : 'productcategory',
                title: 'Ürün Kategorisi',
                type : 'basic',
                icon : 'heroicons_outline:tag',
                link : '/productcategory'
            },
            {
                id   : 'paymentmethods',
                title: 'Ödeme Yöntemleri',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/paymentmethods'
            },

        ]
        
    },
    {
        id   : 'settings',
        title: 'Ayarlar',
        type : 'collapsable',
        icon : 'heroicons_outline:cog',
        children: [
            // {
            //     id   : 'users',
            //     title: 'Kullanıcılar',
            //     type : 'basic',
            //     icon : 'heroicons_outline:user',
            //     link : '/users'
            // },
            {
                id   : 'smsparameters',
                title: 'SMS Ayarları',
                type : 'basic',
                icon : 'send_to_mobile',
                link : '/smsparameters'
            },
            {
                id   : 'parameters',
                title: 'Şirket Parametreleri',
                type : 'basic',
                icon : 'heroicons_outline:adjustments',
                link : '/parameters'
            },
        ]
        
    },
    {
        id   : 'example',
        title: 'Ekran Kilidi',
        type : 'basic',
        icon : 'heroicons_outline:lock-closed',
        link : '/example'
    },

];























export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
