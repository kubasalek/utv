'use client';

//import { sql } from '@/lib/db';
//import { getSession } from '@/lib/session';

import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/global/Badge';
import Row from '@/components/global/Row';
import { getRoleColor, getStatusColor, getStatusName } from '@/lib/UTVconfig';

import Table from '@/components/tables/Table';

interface props {
    materialList: any;
}

export default function ClientProjectList({ materialList } : props) {

    return (
        <>
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
                    {materialList.map((material: any) => (
                        <tr key={material.project_id}>
                            <td className="w-auto text-nowrap">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={material.thumbnail_url || "https://dummyimage.com/1920x1080/000/fff"}
                                        className="d-none d-md-block project-thumbnail"
                                    />
                                    <div className="ms-3">
                                        <h6 className="mb-0 fw-bolder">{material.title}</h6>
                                        <span className="text-muted">Dodatkowe informacje</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {
                                    <Badge key={`${material.project_id}-${material.current_status}`} text={getStatusName(material.current_status)} color={getStatusColor(material.current_status)} />
                                }
                            </td>
                            <td>
                                {material.as_roles.map((role: string) => (
                                    <Badge key={`${material.project_id}-${role}`} text={role} color={getRoleColor(role)} />
                                ))}
                            </td>
                            <td>
                                <Link href={`/dashboard/projects/${material.project_id}`}>
                                    <div className="btn btn-sm btn-primary">
                                        Edytuj
                                    </div>
                                </ Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ Table>
            {
                materialList.length == 0 &&
                <Row>
                    <span className="text-center mt-3">Brak materiałów do wyświetlenia</span>
                </Row>
            }
        </>
    )
}