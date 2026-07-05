'use client';

import Image from "next/image";
import Link from "next/link";
import '@/assets/css/styles.min.css';
import CenteredPageWrapper from '@/components/global/CenteredPageWrapper';
import Row from '@/components/global/Row';

// 1. Importujemy Suspense z Reacta
import { useState, useTransition, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loginWithDirectDB } from '@/lib/actions/auth';

// 2. Zmieniamy nazwę starego głównego komponentu na np. LoginForm
// Ten komponent zawiera całą naszą logikę i używa useSearchParams
function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const action = searchParams.get('action');
    const isLoggedOut = action === 'logout';

    const redirect_url = searchParams.get('redirect');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); 

        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            const result = await loginWithDirectDB(formData, redirect_url || "");

            if (!result.success) {
                setError(result.error || 'Coś poszło nie tak.');
            }
        });
    };

    return (
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
            
            {isLoggedOut && !error && (
                <div className="alert alert-success" role="alert">
                    Wylogowano pomyślnie.
                </div>
            )}

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">Login</label>
                    <input type="text" className="form-control" name="login" disabled={isPending} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Hasło</label>
                    <input type="password" className="form-control" name="password" disabled={isPending} />
                </div>
                <input 
                    type="submit" 
                    value={isPending ? "Logowanie..." : "Zaloguj się"} 
                    disabled={isPending} 
                    className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" 
                />
            </form>
			<Row>
				<Link
					href=""
					className="text-center"
				>
					Nie pamiętam hasła
				</ Link>
			</ Row>
        </div>
    );
}

// 3. Tworzymy nowy, czysty domyślny eksport strony
// Zawiera on layout i owija nasz formularz w Suspense
export default function LoginPage() {
    return (
        <CenteredPageWrapper>
            <div className="d-flex align-items-center justify-content-center w-100">
                <div className="row justify-content-center w-100">
                    <div className="col-md-8 col-lg-6 col-xxl-4">
                        <div className="card mb-0">
                            {/* Własność fallback to to, co wyświetli się przez ułamek sekundy ładowania */}
                            <Suspense fallback={<div className="p-4 text-center">Ładowanie formularza...</div>}>
                                <LoginForm />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredPageWrapper>
    );
}