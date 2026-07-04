'use client';
import '@/assets/css/styles.min.css';

import Card from '@/components/global/Card';
import Row from '@/components/global/Row';
import Col from '@/components/global/Col';

import { Input, Select } from '@/components/form/FormControls';
import ProjectList from '@/components/projects/ProjectList';

import { getRoles, getStatuses } from '@/lib/UTVconfig';

import { useState } from 'react';

interface props {
    materialList: object;
}


export default function AdvancedProjectList({ materialList } : props) {    
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [role, setRole] = useState("ALL");

    const statuses = {
        "ALL": "Wszystkie statusy",
        ...getStatuses()
    };

    const UTVroles = getRoles();
    const roles: Record<string, string> = {
        "ALL": "Wszystkie role"
    };
    
    UTVroles.forEach((r: string) => {
        roles[r] = r;
    });

    const filteredData = Object.values(materialList).filter((item: any) => {
        const matchesStatus = status === "ALL" || item.current_status === status;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesRole = role === "ALL" || item.as_roles.includes(role);
        return matchesStatus && matchesSearch && matchesRole;
    });

  	return (
        <>
		    <Row>
			    <Col width={12} sm={6}>
					<Input
                        type="text"
                        placeholder="Wpisz tytuł szukanego materiału"
                        value={search} 
                        onChange={(val: string) => setSearch(val)}
                    />
				</ Col>
				<Col width={8} sm={4}>
					<Select
						options={statuses}
						value={status}
						onChange={(val) => setStatus(val)}
					/>
				</ Col>
                <Col width={4} sm={2}>
					<Select
						options={roles}
						value={role}
						onChange={(val) => setRole(val)}
					/>
				</ Col>
			</ Row>
            <Row>
                <ProjectList materialList={filteredData} />
            </ Row>
        </>
	);
}
