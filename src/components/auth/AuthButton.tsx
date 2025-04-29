import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import AccountDropdown from './AccountDropdown';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface AuthButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  variant = 'default',
  size = 'default'
}) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <Button variant={variant} size={size} disabled>
        Loading...
      </Button>
    );
  }
  
  if (user) {
    return <AccountDropdown />;
  }
  
  return (
    <AuthModal 
      triggerButton={
        <Button variant={variant} size={size} className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </Button>
      }
    />
  );
};

export default AuthButton; 