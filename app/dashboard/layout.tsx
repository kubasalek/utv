import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import DashboardLayout from '@/components/global/DashboardLayout';
import { getUserData } from '@/lib/session';

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
	const userData = await getUserData();
	if (userData == undefined) {
		return (
			<>
			</>
		);
	}

	return (
				<DashboardLayout full_name={userData.full_name} avatar_url={userData.avatar_url}>
					{children}
				</ DashboardLayout>
	);
}
