import { useCallback, useRef } from "react";

export const useObserver = (next: () => void) => {
   const observer = useRef<any>();

   const lastElemRef = useCallback((node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([ entry ]) => {
         if (entry.isIntersecting) {
            next()
         }
      });
      if (node) observer.current.observe(node);
   }, []);

   return { lastElemRef }
}