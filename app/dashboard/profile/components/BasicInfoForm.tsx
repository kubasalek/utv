'use client';
import Row from '@/components/global/Row';
import Col from '@/components/global/Col';

import { useState, useTransition } from 'react';

import { updatePersonalData } from '@/lib/actions/profileActions';

interface props {
    email: string;
    phone: string;
}

export default function Form({ initialEmail, initialPhone} : props) {
    const [email, setEmail] = useState(initialEmail);
    const [phone, setPhone] = useState(initialPhone);

    const [validation, setValidation] = useState("");

    const [isUpdating, startTransition] = useTransition();

    async function updateData() {
        if (initialEmail === email && initialPhone === phone) return;

        startTransition(async () => {
            try {
                await updatePersonalData({ email, phone });
                setValidation(" is-valid")
            } catch (err) {
                setValidation(" is-invalid")
                //alert(err.message);
            }
        });
    }

    return (
        <>
            <Row>
				<Col width={12} md={6}>
					<div className="mb-3">
                        <label className="form-label">Adres e-mail</label>
                        <input
                            type="email"
                            className={"form-control" + validation}
                            disabled={isUpdating}
                            defaultValue={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setValidation("");
                            }}
                            onBlur={updateData}
                        />
                    </div>
				</ Col>
				<Col width={12} md={6}>
					<div className="mb-3">
                        <label className="form-label">Numer telefonu</label>
                        <input
                            type="phone"
                            className={"form-control" + validation}
                            disabled={isUpdating}
                            defaultValue={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setValidation("");
                            }}
                            onBlur={updateData}
                        />
                    </div>
				</ Col>
			</ Row>
        </>
    );
}