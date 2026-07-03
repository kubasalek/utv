'use client'
import Image from "next/image";
import '@/assets/css/styles.min.css';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import RoleButton from '@/components/global/RoleButton';
import Badge from '@/components/global/Badge';

import { useState } from 'react';

import { Icon } from '@iconify/react';

export default function Home() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	//<RoleButton />

	return (
		<Row>
			<Card title="Moje materiały" subtitle="def" width={12}>
				<Badge text="Primary" color="primary" />
				<Badge text="Secondary" color="secondary" />
				<Badge text="Success" color="success" />
				<Badge text="Info" color="info" />
				<Badge text="Warning" color="warning" />
				<Badge text="Danger" color="danger" />
				<Badge text="Light" color="light" />
				<Badge text="Dark" color="dark" />
				<Badge text="Muted" color="muted" />
				<Badge text="Indigo" color="indigo" />
				
			</ Card>
		</Row>
	);
}
