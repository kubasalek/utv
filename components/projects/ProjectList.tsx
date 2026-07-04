'use server';

import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/global/Badge';

import Table from '@/components/tables/Table';

export default async function ProjectList() {
    const session = await getSession();
    if (session == null) {
        return (
            <span>Brak materiałów</span>
        );
    }

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
    
    return (
        <Table>
            <thead>
                <tr>
                    <th>Nazwa materiału</th>
                    <th>Status</th>
                    <th>Rola</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {materialList.map(material => (
                    <tr key={material.project_id}>
                        <td className="w-auto text-nowrap">
                            <div className="d-flex align-items-center">
                                <img
                                    src={material.thumbnail_url || "https://dummyimage.com/1920x1080/000/fff"}
                                    className="d-none d-md-block project-thumbnail"
                                />
                                <div className="ms-3">
                                    <h6 className="mb-0 fw-bolder">{material.title}</h6>
                                    <span className="text-muted d-none">ADDITIONAL DATA</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            {material.current_status}
                        </td>
                        <td>
                            {material.as_roles.map((role: string) => (
                                <Badge key={`${material.project_id}-${role}`} text={role} color="primary" />
                            ))}
                        </td>
                        <td>
                            <Link href={`/dashboard/project/${material.project_id}`}>
                                <div className="btn btn-sm btn-primary">
                                    Edytuj
                                </div>
                            </ Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </ Table>
    )
}