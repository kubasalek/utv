'use client';
import Image from "next/image";
import Link from "next/link";

import { useState, useTransition } from 'react';
import { logout } from '@/lib/actions/auth';

interface props {
    full_name: string;
    avatar_url: string;
}


export default function ProfileDropdown({ full_name, avatar_url } : props) {
    const [isDropdownVisible, setDropdownVisibility] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(() => {
            logout();
        });
    };
    
    return (
            <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                <ul
                    className="navbar-nav flex-row ms-auto align-items-center justify-content-end cursor-pointer"
                    onClick={() => setDropdownVisibility(!isDropdownVisible)}
                >
                {full_name}
                <li className="nav-item dropdown">
                    <a
                        className={isDropdownVisible ? "nav-link show" : "nav-link"}
                        id="drop2"
                        data-bs-toggle="dropdown"
                        aria-expanded={isDropdownVisible ? "true" : "false"}
                    >
                        <img src={avatar_url || "/images/utv.png"} className="rounded-circle" width="35" height="35" alt="Profile picture" />
                    </a>

                    <div
                        className={isDropdownVisible ? "dropdown-menu dropdown-menu-end dropdown-menu-animate-up show" : "dropdown-menu dropdown-menu-end dropdown-menu-animate-up"}
                        data-bs-popper="static"
                        aria-labelledby="drop2"
                    >
                        <div className="message-body">
                            <Link href="/dashboard/profile" className="d-flex align-items-center gap-2 dropdown-item">
                                <i className="ti ti-user fs-6"></i>
                                <p className="mb-0 fs-3">Mój profil</p>
                            </ Link>

                            <a href="" className="d-none align-items-center gap-2 dropdown-item">
                                <i className="ti ti-mail fs-6"></i>
                                <p className="mb-0 fs-3">My Account</p>
                            </a>
                            <a href="" className="d-none align-items-center gap-2 dropdown-item">
                                <i className="ti ti-list-check fs-6"></i>
                                <p className="mb-0 fs-3">My Task</p>
                            </a>
                            <a onClick={handleLogout} className="btn btn-outline-primary mx-3 mt-2 d-block">Wyloguj się</a>
                        </div>
                    </div>
                </li>
                </ul>
            </div>
    )
}