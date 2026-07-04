import '@/assets/css/styles.min.css';

import Card from '@/components/global/Card';
import Row from '@/components/global/Row';

import { sql } from '@/lib/db';

import { Icon } from '@iconify/react';
import { notFound } from 'next/navigation';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	const projectId = resolvedParams.id;

	const material = await sql`
        SELECT *
        FROM projects
        WHERE project_id = ${projectId}
    `;

	if (material.length == 0) {
		return (
			<Row>
				<Card title="Wystąpił błąd" subtitle="Nie znaleziono materiału" width={12} />
			</ Row>
		);
	}

  	return (
		<Row>
			<Card title={material[0].title} subtitle="." width={12} />
		</ Row>
	);
}
