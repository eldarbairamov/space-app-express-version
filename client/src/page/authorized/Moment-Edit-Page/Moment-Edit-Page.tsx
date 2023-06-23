import { useParams } from "react-router-dom";
import { IMoment } from "@src/interface";
import { useAppDispatch } from "@src/hook";
import { getMomentService } from "@src/service";
import { motion } from "framer-motion";
import { BackIcon, DateAndLocation, ModalWLoader, Photo, SaveAndDelete, Tag, Title } from "@src/component";
import { momentActions } from "@src/redux/slice";
import { MOMENTS_COLOR } from "@src/constant";

import style from "./Moment-Edit-Page.module.scss";

export function MomentEditPage() {
   const { momentId } = useParams<{ momentId: string }>();

   const { prevState, setPrevState, isLoading, activeMoment } = getMomentService(momentId!);

   const isActiveMomentHasKeys = Object.keys(activeMoment).length;

   const dispatch = useAppDispatch();

   const handleInputs = (field: string, value: string) => {
      if (value.length <= 20) {
         const updatedMoment = {
            ...activeMoment,
            [field]: value,
         } as IMoment;

         dispatch(momentActions.setActiveMoment(updatedMoment));
      }
   };

   return (
      <>
         <motion.div className={ style.MomentEditPage }
                     initial={ { x: -10 } }
                     animate={ { x: 0 } }>

            { Boolean(isActiveMomentHasKeys) &&
               <div className={ style.moment }>
                  <SaveAndDelete momentId={ momentId! }
                                 activeMoment={ activeMoment }
                                 setPrevState={ setPrevState }
                                 prevState={ prevState }/>

                  <div className={ style.title_and_back }>
                     <BackIcon isBg={ true } style={ { position: "initial", padding: "3px 5px" } }/>
                     <Title activeMoment={ activeMoment }
                            handleInputs={ handleInputs }/>
                  </div>

                  <Photo momentId={ momentId! }
                         activeMoment={ activeMoment }/>

                  <DateAndLocation
                     handleInputs={ handleInputs }
                     activeMoment={ activeMoment }/>

                  <Tag activeMoment={ activeMoment }/>
               </div>
            }

         </motion.div>

         <ModalWLoader isLoading={ isLoading } color={ MOMENTS_COLOR }/>
      </>
   );
}
