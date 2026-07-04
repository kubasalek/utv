'use client';

import Image from "next/image";
import Link from "next/link";
import '@/assets/css/styles.min.css';
import CenteredPageWrapper from '@/components/global/CenteredPageWrapper';
import Row from '@/components/global/Row';

export default function Page() {
    return (
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
								<div className="row justify-content-center mt-2">
									<h4 className="text-center">Nie znaleziono strony</h4>
								</div>
								<div className="row justify-content-center mt-3">
									<center>
										<Link href="/dashboard">Wróć do Kokpitu</ Link>
									</center>
								</div>
            				</div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredPageWrapper>
    );
}