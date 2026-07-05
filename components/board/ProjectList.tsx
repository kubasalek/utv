'use client';

import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/global/Badge';
import Row from '@/components/global/Row';
import { getRoleColor, getStatusColor, getStatusName } from '@/lib/UTVconfig';

import Table from '@/components/tables/Table';

interface props {
    materialList: any;
}

export default function BoardProjectList({ materialList } : props) {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Nazwa materiału</th>
                        <th>Status</th>
                        <th>Poszukiwana rola</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {materialList.map((material: any) => (
                        <tr key={material.project_id + "-" + material.role}>
                            <td className="w-auto text-nowrap">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={material.thumbnail_url || "https://dummyimage.com/1920x1080/000/fff"}
                                        className="d-none d-md-block project-thumbnail"
                                    />
                                    <div className="ms-3">
                                        <h6 className="mb-0 fw-bolder">{material.title}</h6>
                                        <span className="text-muted">Uniwerek.TV</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {
                                    <Badge key={`${material.project_id}-${material.current_status}`} text={getStatusName(material.current_status)} color={getStatusColor(material.current_status)} />
                                }
                            </td>
                            <td>
                                <Badge text={material.role} color={getRoleColor(material.role)} />
                            </td>
                            <td>
                                <Link href={`/dashboard/board/${material.project_id}`}>
                                    <div className="btn btn-sm btn-primary">
                                        Wyświetl
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