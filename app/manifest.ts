import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Panel UTV',
    short_name: 'UTV',
    description: 'Panel do zarządzania treściami Uniwerek.TV',
    start_url: '/',
    scope: '/', // To powstrzymuje Safari przed wychodzeniem z aplikacji!
    display: 'standalone',
    background_color: '#ffffff', // Kolor tła podczas ładowania
    theme_color: '#ffffff', // Kolor górnego paska (np. pod zegarem)
    /*icons: [
      {
        // Tymczasowo użyjemy Twojego logo, ale docelowo powinieneś wygenerować kwadratową ikonę 192x192
        src: '/images/utv.png', 
        sizes: '192x192',
        type: 'image/png',
      },
      {
        // ... oraz wersję 512x512
        src: '/images/utv.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],*/
  };
}