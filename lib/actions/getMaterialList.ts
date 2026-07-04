'use server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';

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