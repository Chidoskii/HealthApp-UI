import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useAdminSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (fname, lname, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/admins/admin_signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fname, lname }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      // save the admin to local storage
      localStorage.setItem('admin', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'ADMIN_LOGIN', payload: json });

      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
