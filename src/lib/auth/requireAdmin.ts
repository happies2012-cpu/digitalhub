import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { requireAuth } from './requireAuth';

export type AppRole = 'admin' | 'user' | 'agency';

/**
 * Check if user has a specific role
 */
export async function hasRole(userId: string, role: AppRole): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', role)
    .single();
  
  return !error && !!data;
}

/**
 * Get all roles for a user
 */
export async function getUserRoles(userId: string): Promise<AppRole[]> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);
  
  if (error || !data) {
    return [];
  }
  
  return data.map(r => r.role as AppRole);
}

/**
 * Require admin role - throws error if user is not admin
 */
export async function requireAdmin(): Promise<User> {
  const user = await requireAuth();
  
  const isAdmin = await hasRole(user.id, 'admin');
  
  if (!isAdmin) {
    throw new Error('Admin access required');
  }
  
  return user;
}

/**
 * Require specific role
 */
export async function requireRole(role: AppRole): Promise<User> {
  const user = await requireAuth();
  
  const hasRequiredRole = await hasRole(user.id, role);
  
  if (!hasRequiredRole) {
    throw new Error(`${role} access required`);
  }
  
  return user;
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const user = await requireAuth();
    return await hasRole(user.id, 'admin');
  } catch {
    return false;
  }
}
