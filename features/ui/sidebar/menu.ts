export type MenuType = 'label' | 'link' | 'dropdown';

export interface MenuSubLink {
  title: string;
  path: string;
}

export interface MenuItem {
  id: string; // Unikalny identyfikator potrzebny Reactowi (klucz)
  type: MenuType;
  title: string;
  icon?: string; // Przechowuje klasę z Tabler Icons (np. "ti ti-atom") lub nazwę dla Iconify
  path?: string;
  sublinks?: MenuSubLink[];
}

export const sidebarMenuConfig: MenuItem[] = [
  {
    id: 'label-utv',
    type: 'label',
    title: 'Uniwerek.TV',
    icon: 'solar:menu-dots-linear'
  },
  {
    id: 'link-kokpit',
    type: 'link',
    title: 'Kokpit',
    icon: 'ti ti-layout-board-split',
    path: '/' 
  },
  {
    id: 'label-settings',
    type: 'label',
    title: 'Ustawienia',
    icon: 'solar:menu-dots-linear'
  },
  {
    id: 'link-profil',
    type: 'link',
    title: 'Profil',
    icon: 'ti ti-user',
    path: '/profile'
  }
  /*{
    id: 'link-kolaudacja',
    type: 'link',
    title: 'Kolaudacja',
    icon: 'ti ti-arrow-bounce',
    path: '/review'
  },
  {
    id: 'link-harmonogram',
    type: 'link',
    title: 'Harmonogram',
    icon: 'ti ti-calendar-stats',
    path: '/schedule'
  },
  {
    id: 'drop-sprzet',
    type: 'dropdown',
    title: 'Sprzęt',
    icon: 'ti ti-video',
    sublinks: [
      { title: 'Kalendarz', path: '/hardware/calendar' },
      { title: 'Lista', path: '/hardware/list' }
    ]
  },*/
  /*{
    id: 'label-inne',
    type: 'label',
    title: 'Inne',
    icon: 'solar:menu-dots-linear'
  },
  {
    id: 'drop-montaz',
    type: 'dropdown',
    title: 'Montaż',
    icon: 'ti ti-chart-donut-3',
    sublinks: [
      { title: 'Blog Posts', path: '/montaz/posts' },
      { title: 'Blog Details', path: '/montaz/details' },
    ]
  },
  { id: 'link-profil', type: 'link', title: 'Profil', icon: 'ti ti-user-circle', path: '/profil' },
  { id: 'link-kontakt', type: 'link', title: 'Kontakt', icon: 'ti ti-mail', path: '/kontakt' },
  { id: 'link-harmonogram', type: 'link', title: 'Harmonogram', icon: 'ti ti-calendar', path: '/harmonogram' },
  { id: 'link-notatki', type: 'link', title: 'Notatki', icon: 'ti ti-notes', path: '/notatki' }
  */
];