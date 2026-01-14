import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserRoles, AppRole } from '@/lib/auth/requireAdmin';

export function useRole() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const userRoles = await getUserRoles(user.id);
        setRoles(userRoles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, [user]);

  const hasRole = (role: AppRole) => roles.includes(role);
  const isAdmin = hasRole('admin');
  const isAgency = hasRole('agency');

  return {
    roles,
    loading,
    hasRole,
    isAdmin,
    isAgency,
  };
}
