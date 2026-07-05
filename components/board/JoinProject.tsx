'use client';

import { useTransition } from 'react';
import { joinMaterial } from '@/lib/actions/board';
import { redirect } from 'next/navigation';

interface props {
	project_id: string;
    role: string;
}

export default function JoinProjectBtn({ project_id, role } : props) {
	const [isPending, startTransition] = useTransition();
  
	const isDisabled = isPending;

	const handleClick = () => {
    	startTransition(async () => {
			try {
				await joinMaterial(project_id, role);
			} catch (err : any) {
				alert(err.message);
			}
            redirect('/dashboard/projects/'+project_id);
		});
	};

  return (
    <button 
      onClick={handleClick} 
      disabled={isDisabled}
      className={"btn btn-primary"}
    >
      {isPending ? 'Dołączam...' : 'Dołącz jako ' + role}
    </button>
  );
}