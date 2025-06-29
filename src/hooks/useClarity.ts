import { useEffect } from 'react';

export const useClarity = (trackingId: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only run in browser
      (window as any).clarity = (window as any).clarity || function() {
        ((window as any).clarity.q = (window as any).clarity.q || []).push(arguments);
      };

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${trackingId}`;
      script.type = 'text/javascript';
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }

      // Clean up function
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [trackingId]);
};
