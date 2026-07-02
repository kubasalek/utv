import Image from "next/image";
import '@/assets/css/styles.min.css';
import BodyWrapper from '@/components/global/BodyWrapper';
import MainWrapper from '@/components/global/MainWrapper';
import PageWrapper from '@/components/global/PageWrapper';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import RoleButton from '@/components/global/RoleButton';

import { Icon } from '@iconify/react';

export default function Home() {
  return (
	<BodyWrapper>
		<Sidebar />
		<MainWrapper>
			<Header />
			<PageWrapper>
				<Row>
					<Card title="Moje materiały" subtitle="def" width="8">
						<RoleButton />
					</ Card>
				</Row>
				<Row>
					<Card title="Moje materiały" subtitle="def" width="4">
						TEST
					</ Card>
				</Row>
			</ PageWrapper>
		</ MainWrapper>
	</ BodyWrapper>
  );
}
