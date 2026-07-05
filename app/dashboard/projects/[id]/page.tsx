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

import SendToReviewButton from '@/components/projects/SendToReviewButton';

import { sql } from '@/lib/db';

import { Icon } from '@iconify/react';
import { notFound } from 'next/navigation';

import { getStatusHistory, getCurrentStatus, isAbleToReview } from '@/lib/actions/materials';
import { getStatusName, getStatusColor } from '@/lib/UTVconfig';

import { Input } from '@/components/form/FormControls';
import TextArea from '@/components/form/TextArea';


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

  	return (
		<>
			{/* Główne informacje */}
			<Row>
				<Col width={12} lg={7} xxl={8}>
					<Card title={material[0].title} subtitle="Metryczka materiału" width={12}>
						<Row>
							<Col width={12}>
								{/*<ChangeStatusModal />*/}
								<ProjectDescription project_id={project_id} initial_description={material[0].description} />
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
							<ModifyTeamSize project_id={project_id} initial_team_size={teamSize} />
						</ Card>
					</ Row>
					<Row>
						<Card title="Instrukcje dla ekipy" subtitle="Najważniejsze informacje" width={12}>
							<TeamInformation project_id={project_id} initial_info={material[0].team_info} />
						</ Card>
					</ Row>
				</ Col>

			</ Row>

			{/* Panel operatora */}
			<Row>
				<Card title="Panel operatora" subtitle="Narzędzia dla operatorów" width={12}>
					<Row>
						<Col width={12}>
							<p className="mb-3">
								Umieść surowy materiał na Dysku Google w jednym folderze. Skopiuj do niego link i wklej poniżej.
							</p>
						</ Col>
					</ Row>
					<Row>
						<Col width={8}>
							<Input placeholder="Link do surówki" type="text" />
						</ Col>
						<Col width={3}>
							<div className="btn btn-primary">Wyślij do montażu</div>
						</ Col>
					</ Row>
				</ Card>
			</ Row>

			{/* Panel montażysty */}
			<Row>
				<Card title="Montaż" subtitle="Narzędzia dla montażystów" width={12}>
					<Row>
						<Col width={8}>
							<Input placeholder="Link do materiału na Frame.io" type="text"/>
						</ Col>
						<Col width={3}>
							{
								await isAbleToReview(project_id) ?
								<SendToReviewButton project_id={project_id} />
								:
								<div className="btn btn-success disabled">Wysłano do kolaudacji</div>
							}
						</ Col>
					</ Row>
				</ Card>
			</ Row>

			{/* Statusy */}
			<Row>
				<Card
					title="Historia statusów materiału"
					subtitle=""
					width={12}
				>
					<Table>
						<thead>
							<tr>
								<th>Wprowadzony przez</th>
								<th>Status</th>
								<th>Komentarz</th>
							</tr>
						</thead>

						<tbody>
							{
								statusHistory.map((status: any) => (
									<tr key={status.status_id}>
										<td>
											{
												<div className="d-flex align-items-center">
													<img
														src={status.avatar_url || "/images/utv.png"}
														className="d-none d-md-block user-profile-pic"
													/>
													<div className="ms-2">
														<h6 className="mb-0 fw-bolder">{status.full_name || "System"}</h6>
														<span className="text-muted">{status.created_at.toLocaleString('pl-PL')}</span>
													</div>
												</div>
											}
										</td>
										<td>
											<Badge text={getStatusName(status.status_name)} color={getStatusColor(status.status_name)} />
										</td>
										<td style={{ width: "50%"}}>
											<div style={{ whiteSpace: "pre-line" }}>
												{status.comment}
											</div>
										</td>
									</tr>
								))
							}
						</tbody>
					</ Table>
				</ Card>
			</ Row>
		</>
	);
}
