'use server';

import { requireAuth } from '@/lib/session'; // Twoja ścieżka do pliku z autoryzacją

export async function checkRoleAction(roleToCheck: string) {
  try {
    // Próbujemy uwierzytelnić użytkownika i sprawdzić, czy ma podaną rolę
    await requireAuth([roleToCheck]);
    
    // Jeśli requireAuth nie rzuci błędu, to znaczy, że użytkownik ma uprawnienia
    return { success: true, message: 'Masz wymagane uprawnienia!' };

  } catch (error: any) {
    // Przechwytujemy błąd (np. brak roli, wygasła sesja, usunięte konto)
    // Zwracamy go bezpiecznie do frontendu bez wywoływania awarii aplikacji
    return { success: false, error: error.message || 'Wystąpił błąd autoryzacji.' };
  }
}