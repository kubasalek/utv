'use client';
import { useState, useTransition } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from '@/components/global/Row';
import Table from '@/components/tables/Table';
import Badge from '@/components/global/Badge';
import { Input } from '@/components/form/FormControls';

import { getRoles, getRoleColor } from '@/lib/UTVconfig';
import { updateTeamSize } from '@/lib/actions/materials';

interface props {
	project_id: string;
	initial_team_size: object;
}

export default function ModifyTeamSizeModal({ project_id, initial_team_size } : props) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [isPending, startTransition] = useTransition();

	// Dane o wielkości zespołu
	const [teamSize, setTeamSize] = useState<Record<string, number>>(initial_team_size as Record<string, number>)

	// Funkcja aktualizująca jedną rolę w stanie
    const handleInputChange = (role: string, value: string) => {
        setTeamSize(prev => ({
            ...prev,
            [role]: parseInt(value) || 0 // Zamieniamy string na liczbę
        }));
    };

	const handleSave = () => {
        console.log("Dane do wysłania:", teamSize);
        startTransition(async () => {
			const result = await updateTeamSize(project_id, teamSize);
			handleClose();
        });
    };

	const roles = getRoles();

  	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Zmodyfikuj zapotrzebowanie
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Modyfikacja ekipy
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					Wskaż zapotrzebowanie na osoby z każdego działu
					<Row>
						<Table>
							<thead>
								<tr>
									<th>Dział</th>
									<th>Liczba osób</th>
								</tr>
							</thead>
							<tbody>
								{
									roles.map((role : string) => (
										<tr key={role}>
											<td>
												<Badge text={role} color={getRoleColor(role)}/>
											</td>
											<td>
												<Input
													type="number"
													value={teamSize[role] == null ? "0" : String(teamSize[role])}
													onChange={(val) => handleInputChange(role, val)}
													min="0"
													noMargin
												/>
											</td>
										</tr>
									))
								}
							</tbody>
						</ Table>
					</ Row>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" onClick={handleSave} disabled={isPending}>
						{isPending ? "Zapisywanie..." : "Zapisz"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}