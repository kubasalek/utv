import '@/assets/css/styles.min.css';

import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Col from '@/components/global/Col';

import AdvancedProjectList from '@/components/projects/AdvancedProjectList';

import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';
import { getMaterialList } from '@/lib/actions/materials';


import { Icon } from '@iconify/react';


export default async function Page() {
	const materialList = await getMaterialList();

  	return (
		<>
			<Row>
				<Card title="Moje materiały" subtitle="Lista wszystkich materiałów, w których bierzesz udział" width={12}>
					<AdvancedProjectList materialList={materialList} />
				</ Card>
			</ Row>
		</>
	);
}
