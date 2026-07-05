'use server';

import { sql } from '@/lib/db';

import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/global/Badge';
import Row from '@/components/global/Row';
import { getRoleColor, getStatusColor, getStatusName } from '@/lib/UTVconfig';

import Table from '@/components/tables/Table';

interface props {
    user_uuid: string;
	project_id: string;
}

export default async function PersonWithRoles({ user_uuid, project_id } : props) {

    const user = await sql`
        SELECT
			project_id,
			ARRAY_AGG(as_role) as as_roles,
			CONCAT(first_name, ' ', last_name) as full_name,
			avatar_url
		FROM project_assignments
		LEFT JOIN users
		ON users.uuid = project_assignments.user_uuid
		WHERE user_uuid = ${user_uuid} AND project_id = ${project_id}
		GROUP BY CONCAT(first_name, ' ', last_name), avatar_url, project_id
    `;

    return (
        <div className="d-flex align-items-center">
			<img
				src={user[0].avatar_url || "/images/utv.png"}
				className="user-profile-pic"
			/>
			<div className="ms-2">
				<h6 className="mb-0 fw-bolder">{user[0].full_name}</h6>
				<span className="text-muted">
					{user[0].as_roles.map((role: string) => (
                        <Badge small key={`${user[0].user_uuid}-${role}`} text={role} color={getRoleColor(role)} />
                    ))}
					</span>
			</div>
		</div>
    )
}