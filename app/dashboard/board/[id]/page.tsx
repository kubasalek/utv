import '@/assets/css/styles.min.css';

import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Col from '@/components/global/Col';
import Table from '@/components/tables/Table';
import Badge from '@/components/global/Badge';

import ProjectDescription from '@/components/projects/ProjectDescription';
import TeamInformation from '@/components/projects/TeamInformation';

import ModifyTeamSize from '@/components/modals/ModifyTeamSize';

import PersonWithRoles from '@/components/projects/PersonWithRoles';

import JoinProject from '@/components/board/JoinProject';

import { sql } from '@/lib/db';

import { Icon } from '@iconify/react';
import { notFound } from 'next/navigation';

import { getStatusHistory, getCurrentStatus, isAbleToReview } from '@/lib/actions/materials';
import { getStatusName, getStatusColor } from '@/lib/UTVconfig';
import { getUserRoles } from '@/lib/actions/permissions';

import { Input } from '@/components/form/FormControls';
import TextArea from '@/components/form/TextArea';

import { joinMaterial } from '@/lib/actions/board';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	const project_id = resolvedParams.id;

	const material = await sql`
        SELECT *
        FROM projects
        WHERE project_id = ${project_id}
    `;

	const peopleAssigned = await sql`
		SELECT
			project_id,
			user_uuid,
		ARRAY_AGG(as_role) as as_roles
		FROM project_assignments
		WHERE project_id = ${project_id}
		GROUP BY user_uuid, project_id
	`;

	if (material.length == 0) {
		notFound();
		return;
	}

	const statusHistory = await getStatusHistory(project_id);
	const currentStatus = await getCurrentStatus(project_id);
	const teamSize = material[0].team_size;
	
	// Pobieranie ról, jako które można dołączyć
	const userRoles = await getUserRoles();

  	return (
		<>
			{/* Główne informacje */}
			<Row>
				<Col width={12} lg={7} xxl={8}>
					<Card title={material[0].title} subtitle="Metryczka materiału" width={12}>
						<Row>
							<Col width={12}>
								{material[0].description}
							</ Col>
						</ Row>
					</ Card>
				</ Col>

				<Col width={12} lg={5} xxl={4}>
					<Row>
						<Card title="Ekipa" subtitle="Osoby zaangażowane w tworzenie materiału" width={12}>
							<ul className="withgap">
								{peopleAssigned.map((person : any) => (
									<li key={person.user_uuid}>
										<PersonWithRoles user_uuid={person.user_uuid} project_id={project_id} />
									</li>
								))}
							</ul>
						</ Card>
					</ Row>
				</ Col>

			</ Row>

			<Row>
				<Col width={12} centered withgap>
					{
						userRoles
						.filter((role) => (teamSize[role] != undefined && teamSize[role] >= 1))
						.map((role) => <JoinProject key={role} project_id={project_id} role={role} />)
					}
				</ Col>
			</ Row>
		</>
	);
}
