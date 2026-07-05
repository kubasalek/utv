'use server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getUserRoles } from '@/lib/actions/permissions';

export async function getMaterialsOnBoard() {
    const session = await getSession();
	if (!session) return [];

    // Najpierw pobieramy role użytkownika
    const roles = await getUserRoles();

    const promises = roles.map(async (role) => {
        return await sql`
            SELECT 
                projects.project_id,
                projects.title, 
                projects.thumbnail_url,
                (
                    SELECT project_statuses.status_name 
                    FROM project_statuses 
                    WHERE project_statuses.project_id = projects.project_id 
                    ORDER BY project_statuses.created_at DESC 
                    LIMIT 1
                ) AS current_status,
                ${role} AS role
            FROM projects
            WHERE (projects.team_size->>${role})::int >= 1
            AND NOT EXISTS (
                SELECT 1 
                FROM project_assignments 
                WHERE project_assignments.project_id = projects.project_id 
                    AND project_assignments.user_uuid = ${session.uuid}
                    AND project_assignments.as_role = ${role}
            );
        `;
    });

    const results = await Promise.all(promises);
    const materialList = results.flat();

    console.log(materialList);

    return materialList;
}

export async function joinMaterial(project_id : string, role : string) {
    const session = await getSession();
	if (!session) throw new Error('Brak uwierzytelnienia!');

    const userRoles = await getUserRoles();
    if (!userRoles.includes(role)) {
        throw new Error('Nie masz uprawnień do dołączania jako ' + role);
    }

    const teamSize = await sql`
        SELECT team_size FROM projects
        WHERE project_id = ${project_id}
    `;

    let team_size = teamSize[0].team_size;

    if (team_size[role] == undefined || team_size[role] < 1) {
        throw new Error('Ta rola została już obsadzona!');
    }

    team_size[role] = team_size[role] - 1;
    if (team_size[role] == 0) delete team_size[role];

    const response1 = await sql`
        UPDATE projects
        SET team_size = ${team_size}
        WHERE project_id = ${project_id}
    `;

    const response2 = await sql`
        INSERT INTO project_assignments (project_id, user_uuid, as_role)
        VALUES (${project_id}, ${session.uuid}, ${role});
    `;
}