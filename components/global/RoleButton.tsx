'use client';

import { useState } from 'react';
import { checkRoleAction } from '@/lib/actions/permissions';

export default function RoleButton() {
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    const result = await checkRoleAction('ADMIN');
    
    setLoading(false);

    // Sprawdzamy co zwrócił serwer i wyświetlamy odpowiedni alert
    if (result.success) {
      alert(`Sukces: ${result.message}`);
    } else {
      alert(`Błąd: ${result.error}`);
    }
  };

  return (
    <button
      onClick={handleCheck}
      disabled={loading}
      className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {loading ? 'Sprawdzam...' : 'Testuj uprawnienia producenta'}
    </button>
  );
}