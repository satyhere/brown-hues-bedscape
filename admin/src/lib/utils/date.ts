import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatStr = 'MMM d, yyyy') => {
  try {
    return format(new Date(dateString), formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export const formatDateTime = (dateString: string) => {
  return formatDate(dateString, 'MMM d, yyyy h:mm a');
};

export const timeAgo = (dateString: string) => {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch (error) {
    console.error('Error calculating time ago:', error);
    return 'Some time ago';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
