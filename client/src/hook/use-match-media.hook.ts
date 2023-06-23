import { useLayoutEffect, useState } from "react";

const queries = [
   "(max-width: 766px)",
   "(min-width: 780px) and (max-width: 1199px)",
   "(min-width: 1200px)",
   "(max-width: 800px)",
   "(max-width: 1000px)",
];

export interface IMatchMedia {
   isMobile: boolean;
   isTablet: boolean;
   isDesktop: boolean;
   isWidth800: boolean;
   isWidth1000: boolean,
}

export const useMatchMedia = (): IMatchMedia => {
   const mediaQueryLists = queries.map((query) => matchMedia(query));

   const getValues = () => mediaQueryLists.map((list) => list.matches);

   const [ values, setValues ] = useState(getValues);

   useLayoutEffect(() => {
      const handler = () => setValues(getValues);

      mediaQueryLists.forEach((list) => list.addEventListener("change", handler));

      return () =>
         mediaQueryLists.forEach((list) =>
            list.removeEventListener("change", handler),
         );
   }, []);

   return [ "isMobile", "isTablet", "isDesktop", "isWidth800", "isWidth1000" ].reduce(
      (acc, screen, index) => ({
         ...acc,
         [screen]: values[index],
      }),
      {},
   ) as IMatchMedia;
};
