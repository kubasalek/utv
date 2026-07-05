'use client';

import { sendToReview } from '@/lib/actions/materials';
import { useTransition } from 'react';

interface props {
	project_id: string;
}

export default function SendToReviewButton({ project_id } : props) {
	/*
	const [isPending, startTransition] = useTransition();
  
	// Możliwość wysyłki tylko, jeśli jest w postprodukcji / do poprawki
	const isDisabled = isPending;

	const handleClick = () => {
    	startTransition(async () => {
			try {
				await sendToReview(project_id, "REVIEW");
			} catch (err) {
				alert(err.message);
			}
		});
	};

  return (
    <button 
      onClick={handleClick} 
      disabled={isDisabled}
      className="btn btn-primary"
    >
      {isPending ? 'Wysyłam...' : 'Wyślij do kolaudacji'}
    </button>
  );
  */
 return (<></>);
}