import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_MANAGER: NbMenuItem[] = [
    
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