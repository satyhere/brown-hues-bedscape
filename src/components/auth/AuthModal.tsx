import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  defaultMode?: AuthMode;
  triggerButton?: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  defaultMode = 'login',
  triggerButton 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const { user } = useAuth();

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const toggleForm = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="default">
            {user ? 'Account' : 'Sign In'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border rounded-lg backdrop-blur-md bg-background/80">
        <AnimatePresence mode="wait" initial={false}>
          {mode === 'login' ? (
            <LoginForm key="login" onSuccess={handleSuccess} onToggleForm={toggleForm} />
          ) : (
            <SignupForm key="signup" onSuccess={handleSuccess} onToggleForm={toggleForm} />
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 