import { useState, useCallback } from 'react';
import { toast } from 'sonner';

type ApiFunction<T extends any[], R> = (...args: T) => Promise<R>;

export function useApi<T extends any[], R>(
  apiFunction: ApiFunction<T, R>,
  options: {
    onSuccess?: (data: R) => void;
    onError?: (error: Error) => void;
    successMessage?: string;
    errorMessage?: string;
  } = {}
) {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: T) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await apiFunction(...args);
        setData(result);
        
        if (options.onSuccess) {
          options.onSuccess(result);
        }
        
        if (options.successMessage) {
          toast.success(options.successMessage);
        }
        
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        
        if (options.onError) {
          options.onError(error);
        } else if (options.errorMessage) {
          toast.error(`${options.errorMessage}: ${error.message}`);
        } else {
          toast.error(`Error: ${error.message}`);
        }
        
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, options]
  );

  return {
    data,
    error,
    isLoading,
    execute,
  };
}
