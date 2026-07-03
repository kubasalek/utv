'use client'
import Image from "next/image";
import '@/assets/css/styles.min.css';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import RoleButton from '@/components/global/RoleButton';

import { useState } from 'react';

import { Icon } from '@iconify/react';

export default function Home() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<Row>
			<Card title="Moje materiały" subtitle="def" width={12}>
				<RoleButton />
			</ Card>
		</Row>
	);
}
