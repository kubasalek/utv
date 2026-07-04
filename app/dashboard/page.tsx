import Image from "next/image";
import '@/assets/css/styles.min.css';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import RoleButton from '@/components/global/RoleButton';
import Badge from '@/components/global/Badge';

import ProjectList from '@/components/projects/ProjectList';

import { getMaterialList } from '@/lib/actions/getMaterialList';

import { Icon } from '@iconify/react';

export default async function Home() {

	//<RoleButton />
	const materialList = await getMaterialList();

	return (
		<Row>
			<Card
				title="Moje materiały"
				subtitle="Lista wszystkich Twoich materiałów w produkcji"
				width={12}
			>
				<ProjectList materialList={materialList} />
				
			</ Card>
		</Row>
	);
}
