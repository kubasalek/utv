'use client';

import Image from "next/image";
import '@/assets/css/styles.min.css';
import BodyWrapper from '@/components/global/BodyWrapper';
import MainWrapper from '@/components/global/MainWrapper';
import PageWrapper from '@/components/global/PageWrapper';
import CenteredPageWrapper from '@/components/global/CenteredPageWrapper';
import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';

import { useState, useTransition } from 'react';
import { loginWithDirectDB } from '@/lib/actions/auth';

import { Icon } from '@iconify/react';


export default function LoginPage() {
	const [error, setError] = useState<string | null>(null);
  	const [isPending, startTransition] = useTransition();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null); // Reset poprzedniego błędu

		const formData = new FormData(event.currentTarget);

		startTransition(async () => {
			const result = await loginWithDirectDB(formData);

			if (!result.success) {
				// Wyświetlamy alert / komunikat o błędzie
				setError(result.error || 'Coś poszło nie tak.');
			} else {
				alert('Zalogowano pomyślnie!');
				// Tutaj możesz np. przekierować użytkownika: window.location.href = '/dashboard';
			}
		});
	};

  	return (
		<BodyWrapper>
			<CenteredPageWrapper>
				<div className="d-flex align-items-center justify-content-center w-100">
						<div className="row justify-content-center w-100">
							<div className="col-md-8 col-lg-6 col-xxl-4">
								<div className="card mb-0">
								<div className="card-body">
									<div className="row justify-content-center mb-4">
										<div className="col-6 col-xl-5 col-xxl-6">
											<Image 
												src="/images/utv-logo.png" 
												width={256} 
												height={62} 
												alt="UTV Logo"
											/>
										</div>
									</div>
									{error && 
										<div className="alert alert-danger" role="alert">
											{error}
										</div>
									}
									<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label htmlFor="login" className="form-label">Login</label>
										<input type="text" className="form-control" name="login" disabled={isPending} />
									</div>
									<div className="mb-4">
										<label htmlFor="password" className="form-label">Hasło</label>
										<input type="password" className="form-control" name="password" disabled={isPending} />
									</div>
									<input type="submit" value={isPending ? "Logowanie..." : "Zaloguj się"} disabled={isPending} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" />
									</form>
								</div>
								</div>
							</div>
						</div>
				</div>
			</CenteredPageWrapper>
		</ BodyWrapper>
  	);
}