import '@/assets/css/styles.min.css';

import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Col from '@/components/global/Col';

import AdvancedProjectList from '@/components/board/AdvancedProjectList';

import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';
import { getMaterialsOnBoard } from '@/lib/actions/board';


import { Icon } from '@iconify/react';


export default async function Page() {
	const materialList = await getMaterialsOnBoard();

  	return (
		<>
			<Row>
				<Card title="Tablica materiałów" subtitle="Materiały, do których możesz dołączyć" width={12}>
					<AdvancedProjectList materialList={materialList} />
				</ Card>
			</ Row>
		</>
	);
}