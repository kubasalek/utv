import { neon } from '@neondatabase/serverless';

// 1. Zabezpieczenie na wypadek braku zmiennej środowiskowej
if (!process.env.DATABASE_URL) {
  throw new Error("Brak zmiennej DATABASE_URL. Sprawdź plik .env.local!");
}

// 2. Inicjalizacja połączenia
// Funkcja neon() tworzy połączenie po HTTP, idealne dla Next.js App Router
export const sql = neon(process.env.DATABASE_URL);