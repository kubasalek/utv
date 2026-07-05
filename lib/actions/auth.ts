'use server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/session';
import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function loginWithDirectDB(formData: FormData, redirect_url: string) {
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
      SELECT uuid, password_hash, first_name, last_name, avatar_url
      FROM users 
      WHERE login = ${login}
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

    await createSession({
      uuid: user.uuid,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar_url: user.avatar_url
    });

  } catch (error) {
    console.error('Błąd podczas logowania do bazy:', error);
    return { success: false, error: 'Błąd połączenia z bazą danych.' };
  }

  // 4. Przekierowanie
  // UWAGA: W Next.js funkcja redirect() rzuca wyjątek (NEXT_REDIRECT), 
  // dlatego MUSI znajdować się poza blokiem try-catch.
  redirect(redirect_url || '/dashboard');
}

export async function logout() {
  // Usuwamy ciasteczko autoryzacyjne
  await deleteSession();
  
  // Przekierowujemy na stronę logowania.
  // Pamiętaj: redirect() w Server Actions działa bezbłędnie i odświeża stan aplikacji.
  redirect('/auth/login?action=logout');
}