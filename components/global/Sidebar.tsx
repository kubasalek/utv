'use client';

import Image from "next/image";
import Link from "next/link";
import { sidebarMenuConfig } from "@/features/ui/sidebar/menu";
import SidebarItem from "@/features/ui/sidebar/SidebarItem";

interface sidebarProps {
    toggleSidebar: () => void;
}

export default function Sidebar({ toggleSidebar } : sidebarProps) {
  return (
    <aside className="left-sidebar">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link href="/dashboard" className="text-nowrap logo-img">
            {/* Zaktualizowana ścieżka - zakłada, że logo jest w public/images/ */}
            <Image 
              src="/images/utv-logo.png" 
              width={128} 
              height={31} 
              alt="UTV Logo" 
            />
          </Link>
          	<div
		  		className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
		  		id="sidebarCollapse"
				onClick={toggleSidebar}
			>
            <i className="ti ti-x fs-6"></i>
          </div>
        </div>

        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            {sidebarMenuConfig.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}

          </ul>
        </nav>
      </div>
    </aside>
  );
}