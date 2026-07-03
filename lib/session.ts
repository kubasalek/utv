import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { sql } from '@/lib/db';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  	uuid: string;
	first_name: string;
	last_name: string;
};

const sessionOptions = {
	name: 'session',
	duration: 7 * 24 * 60 * 60 * 1000, 
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
	.setProtectedHeader({ alg: 'HS256' })
	.setIssuedAt()
	.setExpirationTime('7d')
	.sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
	const { payload } = await jwtVerify(session, encodedKey, {
	  algorithms: ['HS256'],
	});
	return payload as SessionPayload;
  } catch (error) {
	return null; // Token wygasł, jest błędny lub brak tokenu
  }
}

export async function createSession(payload : SessionPayload) {
  const expiresAt = new Date(Date.now() + sessionOptions.duration);
  const session = await encrypt(payload);

  // Dodajemy 'await' przed wywołaniem cookies()
  const cookieStore = await cookies();
  
  cookieStore.set(sessionOptions.name, session, {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
	path: '/',
	expires: expiresAt,
  });
}

export async function deleteSession() {
  // Tutaj również dodajemy 'await'
  const cookieStore = await cookies();
  cookieStore.delete(sessionOptions.name);
}

/**
 * Globalna funkcja do weryfikacji tożsamości i uprawnień.
 * @param allowedRoles - Opcjonalna tablica ról, np. ['admin', 'producer']
 */
export async function requireAuth(allowedRoles?: string[]) {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get('session')?.value;
	const session = await decrypt(sessionCookie);

	console.log(session);

	if (!session?.uuid) {
		throw new Error('Brak autoryzacji. Zaloguj się ponownie.');
	}

	const users = await sql`
		SELECT uuid, first_name, last_name, is_active
		FROM users
		WHERE uuid = ${session.uuid}
		LIMIT 1
	`;

	if (users.length === 0 || !users[0].is_active) {
		throw new Error('Twoje konto jest nieaktywne lub zostało usunięte.');
	}

	const userRolesDB = await sql`
		SELECT roles.name FROM roles
		JOIN user_roles ON user_roles.role_id = roles.id
		JOIN users ON users.uuid = user_roles.user_uuid
		WHERE users.uuid = ${session.uuid}
	`;
	const userRoles = userRolesDB.map(row => row.name);
	

	let user = users[0];
	user.roles = userRoles;
	console.log(user);

	// 3. Weryfikacja uprawnień (jeśli podano wymagane role)
	if (allowedRoles && allowedRoles.length > 0) {
		const hasAccess = userRoles.some(role => allowedRoles.includes(role));

		if (!hasAccess) {
			throw new Error('Brak wystarczających uprawnień do wykonania tej akcji.');
		}
	}

	// Zwracamy bezpieczne dane użytkownika (bez hasła!), 
	// aby akcja serwerowa wiedziała, kto ją wywołał
	return {
		uuid: user.uuid,
		roles: userRoles,
	};
}

export async function getUserFullName() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    const session = await decrypt(sessionCookie);

	if (session == null) {
		return "Niezalogowany";
	}

    return `${session.first_name} ${session.last_name}`;
}