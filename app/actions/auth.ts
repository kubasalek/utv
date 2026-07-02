'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/session';
import { sql } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function loginWithDirectDB(formData: FormData) {
  const login = formData.get('login') as string;
  const password = formData.get('password') as string;

  if (!login || !password) {
    return { success: false, error: 'Wypełnij wszystkie pola!' };
  }

  try {
    // 1. Pobranie użytkownika z bazy danych
    // Funkcja sql z @neondatabase/serverless automatycznie chroni przed SQL Injection
    // Zakładam, że Twoja tabela nazywa się 'users', a kolumny to 'login' i 'password_hash'
    const users = await sql`
      SELECT uuid, email, password_hash 
      FROM users 
      WHERE email = ${login}
      LIMIT 1
    `;

    // Jeśli użytkownik nie istnieje, zwracamy ogólny błąd (nie zdradzamy, co było błędne)
    if (users.length === 0) {
      return { success: false, error: 'Niepoprawny login lub hasło.' };
    }

    const user = users[0];

    // 2. Weryfikacja hasła względem hasha z bazy
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return { success: false, error: 'Niepoprawny login lub hasło.' };
    }

    await createSession(user.uuid);

  } catch (error) {
    console.error('Błąd podczas logowania do bazy:', error);
    return { success: false, error: 'Błąd połączenia z bazą danych.' };
  }

  // 4. Przekierowanie
  // UWAGA: W Next.js funkcja redirect() rzuca wyjątek (NEXT_REDIRECT), 
  // dlatego MUSI znajdować się poza blokiem try-catch.
  redirect('/');
}