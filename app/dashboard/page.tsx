import Image from "next/image";
import '@/assets/css/styles.min.css';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import RoleButton from '@/components/global/RoleButton';
import Badge from '@/components/global/Badge';

import ProjectList from '@/components/projects/ProjectList';

import { Icon } from '@iconify/react';

export default function Home() {

	//<RoleButton />

	return (
		<Row>
			<Card
				title="Moje materiały"
				subtitle="Lista wszystkich Twoich materiałów w produkcji"
				width={12}
			>
				<ProjectList />
				
			</ Card>
		</Row>
	);
}
