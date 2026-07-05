'use server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';

// Pobieranie listy materiałów zalogowanego użytkwonika
export async function getMaterialList() {
    const session = await getSession();

	if (!session) return [];

    const materialList = await sql`
		SELECT 
			projects.project_id,
			projects.title, 
			projects.thumbnail_url,
			ARRAY_AGG(project_assignments.as_role) AS as_roles,
			-- Podzapytanie wyciągające najnowszy status dla danego projektu
			(
				SELECT status_name 
				FROM project_statuses 
				WHERE project_statuses.project_id = projects.project_id 
				ORDER BY created_at DESC 
				LIMIT 1
			) AS current_status
			FROM projects
			JOIN project_assignments ON projects.project_id = project_assignments.project_id
			WHERE project_assignments.user_uuid = ${session.uuid}
			GROUP BY projects.project_id, projects.title
	`;

    
	return materialList;
}

// Pobieranie historii statusów
export async function getStatusHistory(project_id : string) {
	const statusHistory = await sql`
		SELECT
			status_id,
			status_name,
			comment,
			project_statuses.created_at,
			user_uuid,
			avatar_url,
			CASE
				WHEN user_uuid IS NOT NULL THEN CONCAT(first_name, ' ', last_name)
				ELSE 'System'
			END as full_name
		FROM project_statuses
		LEFT JOIN users
		ON project_statuses.user_uuid = users.uuid
		WHERE project_id = ${project_id}
		ORDER BY project_statuses.created_at DESC
	`
	return statusHistory;
}

// Pobieranie aktualnego statusu
export async function getCurrentStatus(project_id : string) {
	const status = await sql`
		SELECT
			status_id,
			status_name,
			comment,
			project_statuses.created_at,
			user_uuid,
			avatar_url,
			CASE
				WHEN user_uuid IS NOT NULL THEN CONCAT(first_name, ' ', last_name)
				ELSE 'System'
			END as full_name
		FROM project_statuses
		LEFT JOIN users
		ON project_statuses.user_uuid = users.uuid
		WHERE project_id = ${project_id}
		ORDER BY project_statuses.created_at DESC
		LIMIT 1
	`
	if (status.length == 0) return undefined;

	return status[0];
}

// Czy materiał może być wysłany do kolaudacji?
export async function isAbleToReview(project_id : string) {
	const currentStatus = await getCurrentStatus(project_id);
	if (currentStatus == undefined) return false;

	if (["POSTPRODUCTION", "REVIEW_FIX"].includes(currentStatus.status_name)) {
		return true;
	}

	return false;
}

// Wysłanie materiału do kolaudacji
export async function sendToReview(project_id : string, status_name : string, comment : string) {
	const session = await getSession();

	if (!session) {
		throw new Error("Brak uwierzytelnienia");
		return;
	}

	const reviewAbility = await isAbleToReview(project_id);
	if (!reviewAbility) {
		throw new Error("Nie możesz na tym etapie wysłać materiału do kolaudacji!");
		return;
	}

	const response = await sql`
		INSERT INTO project_statuses (project_id, user_uuid, status_name, comment)
		VALUES (${project_id}, ${session.uuid}, ${status_name}, ${comment});
	`

	console.log(response);

	return response;
}

export async function updateDescription(project_id : string, description : string) {
	const session = await getSession();

	if (!session) {
		throw new Error("Brak uwierzytelnienia");
		return;
	}

	const response = await sql`
		UPDATE projects
		SET description = ${description}
		WHERE project_id = ${project_id}
	`;

	return response;
}

export async function updateTeamInfo(project_id : string, team_info : string) {
	const session = await getSession();

	if (!session) {
		throw new Error("Brak uwierzytelnienia");
		return;
	}

	const response = await sql`
		UPDATE projects
		SET team_info = ${team_info}
		WHERE project_id = ${project_id}
	`;

	return response;
}

export async function updateTeamSize(project_id : string, team_size : object) {
	const session = await getSession();

	if (!session) {
		throw new Error("Brak uwierzytelnienia");
		return;
	}

	const response = await sql`
		UPDATE projects
		SET team_size = ${team_size}
		WHERE project_id = ${project_id}
	`;

	revalidatePath(`/projects/${project_id}`);

	return response;
}