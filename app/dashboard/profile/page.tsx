import Image from "next/image";
import '@/assets/css/styles.min.css';
import BodyWrapper from '@/components/global/BodyWrapper';
import MainWrapper from '@/components/global/MainWrapper';
import PageWrapper from '@/components/global/PageWrapper';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Col from '@/components/global/Col';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import Badge from '@/components/global/Badge';

import { Input } from '@/components/form/FormControls';

import { getUserData } from '@/lib/session';
import { getUserRoles } from '@/lib/actions/permissions';
import { getRoleColor } from '@/lib/UTVconfig';
import { Icon } from '@iconify/react';
import { notFound } from 'next/navigation';
import { sendMail } from '@/lib/mail'

import BasicInfoForm from './components/BasicInfoForm';
import ICEContact from './components/ICEContact';

export default async function Home() {
	const userData = await getUserData();
	if (userData == undefined) {
		notFound();
	}

	const userRoles = await getUserRoles();

  	return (
		<>
			<Row>
				<Col width={12} lg={8}>
					<Card title="Twój profil" subtitle="Dodaj informacje o sobie" width={12}>
						<Row>
							<Col width={12} md={9}>
								<div className="d-flex mb-2 align-items-center justify-content-between w-100">
									<div className="d-flex w-75">
										<img
											src={userData.avatar_url}
											className="user-profile-pic big"
										/>
										<div className="d-flex flex-column justify-content-center ms-3">
											<h6 className="mb-0 fw-bolder">{userData.full_name}</h6>
											<span className="text-muted">Uniwerek.TV</span>
										</div>
									</div>
									<div className="btn btn-primary w-25 disabled d-none">Zmień zdjęcie profilowe</div>
								</div>
							</ Col>
						</ Row>
						<BasicInfoForm initialEmail="example@example.com" initialPhone="+48 123 456 789" />
					</ Card>
				</ Col>

				<Col width={12} lg={4}>
					<Card title="Kontakt do bliskiej osoby" subtitle="Uzupełnij dane bliskiej osoby" width={12}>
						<ICEContact initialPhone="+48 123 456 789" initialLabel="John Smith" />
					</ Card>
				</ Col>
			</ Row>

			<Row>
				<Col width={12}>
					<Card title="Twoje UTV" subtitle="Informacje na temat Twojego członkostwa w UTV" width={12}>
						{userRoles.map(role => <Badge key={role} color={getRoleColor(role)} text={role} />)}
					</ Card>
				</ Col>
			</ Row>
		</>
  	);
}
