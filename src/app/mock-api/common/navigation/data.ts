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
        icon : 'heroicons_outline:chart-pie',
        children: [
            {
                id   : 'customeradd',
                title: 'Yeni Müşteri Ekle',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/customeradd'
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
        icon : 'heroicons_outline:chart-pie',
        link : '/appointment'
    },
    {
        id   : 'sales',
        title: 'Satş',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/sales'
    },
    {
        id   : 'buying',
        title: 'Alış',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/buying'
    },
    {
        id   : 'lab',
        title: 'Laboratuvar',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/lab'
    },
    {
        id   : 'cashing',
        title: 'Kasa İşlemleri',
        type : 'collapsable',
        icon : 'heroicons_outline:chart-pie',
        children: [
            {
                id   : 'cashtransactions',
                title: 'Kasa Hareketleri',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
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
        icon : 'heroicons_outline:chart-pie',
        children: [
            {
                id   : 'productdescription',
                title: 'Ürün Tanımı',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/productdescription'
            },
            {
                id   : 'vaccinedefinition',
                title: 'Aşı Tanım',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/vaccinedefinition'
            },
        ]
        
    },
    {
        id   : 'suppliers',
        title: 'Tedarikçiler',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/suppliers'
    },
    {
        id   : 'agenda',
        title: 'Ajandam',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/agenda'
    },
    {
        id   : 'store',
        title: 'Depo',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/store'
    },
    {
        id   : 'reports',
        title: 'Raporlar',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
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
        icon : 'heroicons_outline:chart-pie',
        link : '/sms'
    },
    {
        id   : 'definition',
        title: 'Tanımlamalar',
        type : 'collapsable',
        icon : 'heroicons_outline:chart-pie',
        children: [
            {
                id   : 'casingdefinition',
                title: 'Kasa',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/casingdefinition'
            },
            {
                id   : 'unitdefinition',
                title: 'Birim',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/unitdefinition'
            },
            {
                id   : 'productcategory',
                title: 'Ürün Kategorisi Ekle',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/productcategory'
            },
        ]
        
    },
    {
        id   : 'settings',
        title: 'Ayarlar',
        type : 'collapsable',
        icon : 'heroicons_outline:chart-pie',
        children: [
            {
                id   : 'users',
                title: 'Kullanıcılar',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/users'
            },
            {
                id   : 'smsparameters',
                title: 'SMS Ayarları',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/smsparameters'
            },
            {
                id   : 'parameters',
                title: 'Şirket Parametreleri',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/parameters'
            },
        ]
        
    },
    {
        id   : 'example',
        title: 'Ekran Kilidi',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
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
