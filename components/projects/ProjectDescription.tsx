'use client';
import { useTransition, useState } from 'react';
import TextArea from '@/components/form/TextArea';

import { updateDescription } from '@/lib/actions/materials';

interface props {
	project_id: string;
    initial_description: string;
}

export default function ProjectDescription({ project_id, initial_description } : props) {
	const [isPending, startTransition] = useTransition();
    const [description, setDescription] = useState(initial_description);

	const sendNewDescription = () => {
    	startTransition(async () => {
			await updateDescription(project_id, description);
		});
	};

    return (
        <TextArea
            placeholder="Dodaj opis materiału"
            className="w-100"
            value={description || ""}
            rows={5}
            onChange={(e) => setDescription(e)}
            onBlur={() => sendNewDescription()}
            disabled={isPending}
        />
    );
}