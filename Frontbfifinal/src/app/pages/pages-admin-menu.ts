import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
    {
        title: 'MANAGE User',
        group: true,
      },
      {
        title: 'Users',
        icon: 'people-outline',
        link: '/pages/user/all',
      },
      {
        title: 'MANAGE TITRE',
        group: true,
      },
      {
        title: 'UPLOAD DOCUMENT',
        link: '/pages/upload',
        icon: 'cloud-upload-outline',
        home: true,
      },
      {
        title: 'All DOCUMENT',
        link: '/pages/all/emetteur',
        icon: 'layout-outline',
      },
];