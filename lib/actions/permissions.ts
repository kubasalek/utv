'use server';

import { requireAuth, getSession } from '@/lib/session'; // Twoja ścieżka do pliku z autoryzacją
import { sql } from '@/lib/db';

export async function getUserRoles() {
  const session = await getSession();
	if (!session) return [];

  const userRolesDB = await sql`
		SELECT roles.id FROM roles
		JOIN user_roles ON user_roles.role_id = roles.id
		JOIN users ON users.uuid = user_roles.user_uuid
		WHERE users.uuid = ${session.uuid}
	`;

	const userRoles = userRolesDB.map(row => row.id);
	return userRoles;
}