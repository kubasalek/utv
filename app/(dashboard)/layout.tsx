import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import DashboardLayout from '@/components/global/DashboardLayout';
import { getUserFullName } from '@/lib/session';

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Panel UTV",
	description: "Panel do zarządzania treściami Uniwerek.TV",
};

export default async function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
	return (
		<html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<DashboardLayout fullName={getUserFullName()}>
					{children}
				</ DashboardLayout>
			</body>
		</html>
	);
}
