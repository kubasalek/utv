'use client';
import { useTransition, useState } from 'react';
import TextArea from '@/components/form/TextArea';

import { updateTeamInfo } from '@/lib/actions/materials';

interface props {
	project_id: string;
    initial_info: string;
}

export default function TeamInformation({ project_id, initial_info } : props) {
	const [isPending, startTransition] = useTransition();
    const [info, setInfo] = useState(initial_info);

	const sendNewTeamInfo = () => {
    	startTransition(async () => {
			await updateTeamInfo(project_id, info);
		});
	};

    return (
        <TextArea
            placeholder="Dodaj informacje dla ekipy"
            className="w-100"
            value={info || ""}
            rows={3}
            onChange={(e) => setInfo(e)}
            onBlur={() => sendNewTeamInfo()}
            disabled={isPending}
        />
    );
}