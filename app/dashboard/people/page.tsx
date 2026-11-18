import Image from "next/image";
import '@/assets/css/styles.min.css';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import Badge from '@/components/global/Badge';

import PeopleList from './components/PeopleList';

import { getMaterialList } from '@/lib/actions/materials';

import { Icon } from '@iconify/react';

export default async function Home() {
	const materialList = await getMaterialList();

	return (
		<Row>
			<Card
				title="Zespół UTV"
				subtitle="Lista członków UTV"
				width={12}
			>
				<PeopleList />
				
			</ Card>
		</Row>
	);
}
