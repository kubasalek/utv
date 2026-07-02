"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MenuItem } from "@/features/ui/sidebar/menu";

interface SidebarItemProps {
  item: MenuItem;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 1. Renderowanie Etykiety (Label)
  if (item.type === 'label') {
    return (
      <li className="nav-small-cap mt-4">
        {item.icon && item.icon.includes(':') ? (
          <Icon icon={item.icon} className="nav-small-cap-icon fs-4" />
        ) : (
          <i className={item.icon}></i>
        )}
        <span className="hide-menu">{item.title}</span>
      </li>
    );
  }

  // 2. Renderowanie zwykłego Linku
  if (item.type === 'link') {
    const isActive = pathname === item.path;
    return (
      <li className="sidebar-item">
        <Link 
          href={item.path || '#'} 
          className={`sidebar-link justify-content-between ${isActive ? 'active' : ''}`}
        >
          <div className="d-flex align-items-center gap-3">
            <span className="d-flex">
              <i className={item.icon}></i>
            </span>
            <span className="hide-menu">{item.title}</span>
          </div>
        </Link>
      </li>
    );
  }

  // 3. Renderowanie Listy Rozwijanej (Dropdown) - TO JEST NAPRAWIONE
  if (item.type === 'dropdown') {
    const hasActiveChild = item.sublinks?.some(sub => pathname === sub.path);
    const isMenuOpen = isOpen || hasActiveChild;

    return (
      <li className="sidebar-item">
        {/* Zmieniono z powrotem na <a>, aby CSS szablonu zadziałał */}
        <a 
          href="#"
          className={`sidebar-link justify-content-between has-arrow ${isMenuOpen ? 'active' : ''}`} 
          onClick={(e) => {
            e.preventDefault(); // Blokujemy skok strony do góry (href="#")
            setIsOpen(!isOpen); // Toglujemy stan
          }}
          aria-expanded={isMenuOpen}
        >
          <div className="d-flex align-items-center gap-3">
            <span className="d-flex">
              <i className={item.icon}></i>
            </span>
            <span className="hide-menu">{item.title}</span>
          </div>
        </a>
        
        {/* Wymuszamy display: block, gdy menu ma być otwarte */}
        <ul 
          aria-expanded={isMenuOpen} 
          className={`first-level ${isMenuOpen ? 'd-block' : 'd-none'}`}
          style={{ 
            height: isMenuOpen ? 'auto' : '0',
            overflow: 'hidden'
          }} 
        >
          {item.sublinks?.map((sub) => {
            const isSubActive = pathname === sub.path;
            return (
              <li className="sidebar-item" key={sub.path}>
                <Link 
                  href={sub.path} 
                  className={`sidebar-link justify-content-between ${isSubActive ? 'active' : ''}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className={`round-16 d-flex align-items-center justify-content-center ${isSubActive ? 'text-primary' : ''}`}>
                      <i className="ti ti-circle"></i>
                    </div>
                    <span className="hide-menu">{sub.title}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  return null;
}