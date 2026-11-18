import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';

import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/global/Badge';
import Row from '@/components/global/Row';
import { getRoleColor, getStatusColor, getStatusName, getDefaultAvatar } from '@/lib/UTVconfig';

import Table from '@/components/tables/Table';

interface props {
    materialList: any;
}

export default async function PeopleList() {

    const peopleList = await sql`
        SELECT
            users.uuid,
            CONCAT(users.first_name, ' ', users.last_name) AS full_name,
            COALESCE(users.avatar_url, ${getDefaultAvatar()}) AS avatar_url,
            ARRAY_AGG(user_roles.role_id ORDER BY roles.level DESC) AS roles
        FROM users
        LEFT JOIN user_roles ON users.uuid = user_roles.user_uuid
        LEFT JOIN roles ON user_roles.role_id = roles.id
        GROUP BY users.uuid
        ORDER BY users.last_name ASC
    `

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Imię i nazwisko</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {peopleList.map((person) => (
                        <tr key={person.uuid}>
                            <td>
                                <div className="d-flex w-75">
                                    <img
                                        src={person.avatar_url}
                                        className="user-profile-pic"
                                    />
                                    <div className="d-flex flex-column justify-content-center ms-3">
                                        <h6 className="mb-0 fw-bolder">{person.full_name}</h6>
                                        <span className="text-muted">Uniwerek.TV</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {person.roles.map(role => <Badge key={role} color={getRoleColor(role)} text={role} />)}
                            </td>
                            <td>
                                <div className="btn btn-primary btn-sm disabled">Pokaż profil</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ Table>
            {
                peopleList.length === 0 &&
                <Row>
                    <span className="text-center mt-3">Brak osób do wyświetlenia</span>
                </Row>
            }
        </>
    )
}