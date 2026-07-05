'use client';
import { useState } from 'react';
import Sidebar from '@/components/global/Sidebar';
import Header from '@/components/global/Header';
import BodyWrapper from '@/components/global/BodyWrapper';
import MainWrapper from '@/components/global/MainWrapper';
import PageWrapper from '@/components/global/PageWrapper';

interface dashboardLayoutProps {
    children: React.ReactNode;
    full_name: string;
	avatar_url: string;
}

export default function DashboardLayout({ children, full_name, avatar_url }: dashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <BodyWrapper isSidebarOpen={isSidebarOpen}>
			<Sidebar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
			<MainWrapper>
				<Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} full_name={full_name} avatar_url={avatar_url} />
				<PageWrapper>
					{children}
				</ PageWrapper>
			</ MainWrapper>
		</ BodyWrapper>
    )
}