'use client';
import Row from '@/components/global/Row';
import Col from '@/components/global/Col';

import { useState, useTransition } from 'react';
import { updateICE } from '@/lib/actions/profileActions';

import { Input } from '@/components/form/FormControls';

interface props {
    initialPhone: string;
    initialLabel: string;
}

export default function Form({ initialPhone, initialLabel} : props) {
    const [phone, setPhone] = useState(initialPhone);
    const [label, setLabel] = useState(initialLabel);

    const [validation, setValidation] = useState("");

    const [isUpdating, startTransition] = useTransition();

    async function updateData() {
        if (initialPhone === phone && initialLabel === label) return;

        startTransition(async () => {
            try {
                await updateICE({ phone, label });
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
				<Col width={12}>
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
				<Col width={12}>
					<div className="mb-3">
                        <label className="form-label">Opis kontaktu</label>
                        <input
                            type="text"
                            className={"form-control" + validation}
                            disabled={isUpdating}
                            defaultValue={label}
                            onChange={(e) => {
                                setLabel(e.target.value);
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