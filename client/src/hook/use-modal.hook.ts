import { useState } from "react";

export const useModal = (isLoading: boolean) => {
   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   return { toggleModal }
}
