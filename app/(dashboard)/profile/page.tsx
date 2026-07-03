'use client';

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
		<Row>
			<Card title="Profil" subtitle="Modyfikuj swoje dane" width={12}>
				<Row>
					<div className="col-6">
						<input className="form-control" type="text" />
					</div>
					<div className="col-6">
						<input className="form-control" type="text" />
					</div>
				</ Row>
			</ Card>
		</ Row>
  );
}
