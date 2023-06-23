import { useState } from "react";

import { Select } from "antd";
import { NoBgButton } from "@src/component";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { momentActions } from "@src/redux/slice";

import style from "./Moment-Header.module.scss";
import addLight from "/add-light.svg";
import addDark from "/add-dark.svg";

interface IMomentHeaderProps {
   addMomentFn: () => Promise<void>;
}

export function MomentHeader({ addMomentFn }: IMomentHeaderProps) {
   const [ isValueNull, setIsValueNull ] = useState<any>();

   const dispatch = useAppDispatch();

   const select = (value: string) => dispatch(momentActions.setSearchKey(value));

   const { tags } = useAppSelector(state => state.momentReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <div className={ style.MomentHeader }>

         <div className={ style.save_moment }>
            <img src={ isDark ? addLight : addDark }
                 alt={ "add" }/>

            <NoBgButton text={ "Додати" }
                        hoverSubject={ "moment" }
                        onClick={ async () => {
                           await addMomentFn();
                           select("");
                           setIsValueNull(null);
                        } }/>
         </div>

         <div className={ style.select_wrapper }>
            <Select style={ { width: 120 } }
                    allowClear={ true }
                    placeholder={ "фільтр" }
                    notFoundContent={ "Пусто" }
                    bordered={ false }
                    value={ isValueNull && null }
                    onChange={ select }
                    options={ tags.map(tag => ({ value: tag, label: tag })) }
                    filterOption={ (input, option) =>
                       (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }/>
         </div>

      </div>
   );
}
