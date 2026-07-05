'use server';

import { requireAuth, getSession } from '@/lib/session'; // Twoja ścieżka do pliku z autoryzacją
import { sql } from '@/lib/db';

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

export async function getUserRoles() {
  const session = await getSession();
	if (!session) return [];

  const userRolesDB = await sql`
		SELECT roles.name FROM roles
		JOIN user_roles ON user_roles.role_id = roles.id
		JOIN users ON users.uuid = user_roles.user_uuid
		WHERE users.uuid = ${session.uuid}
	`;

	const userRoles = userRolesDB.map(row => row.name);
	return userRoles;
}