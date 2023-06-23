import { Loader, Modal } from "@src/component";
import { useModal } from "@src/hook";

export function ModalWLoader({ isLoading, color }: { isLoading: boolean, color: string }) {
   const { toggleModal } = useModal(isLoading);

   return (
      <Modal isOpen={ isLoading }
             onClose={ toggleModal }
             isBg={ false }>
         <Loader color={ color }/>
      </Modal>
   );
}
