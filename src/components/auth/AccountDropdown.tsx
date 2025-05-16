import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, LogOut, UserCircle } from 'lucide-react';

const AccountDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="glass-button p-2 rounded-full relative">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass p-2 min-w-[220px]">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email_confirmed_at ? 'Verified' : 'Email not verified'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer flex items-center gap-2" 
          onClick={() => navigate('/profile')}
        >
          <UserCircle className="h-4 w-4" />
          <span>Your Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive" 
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown; 