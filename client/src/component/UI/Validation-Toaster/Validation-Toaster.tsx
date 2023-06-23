import { useEffect } from "react";

import { App } from "antd";

interface ErrorModalProps {
   error: { message: string };
}

export function ValidationToaster({ error }: ErrorModalProps) {
   const { message } = App.useApp();

   useEffect(() => {
      error.message && message.error(error.message);
   }, [ error ]);

   return (<></>);
}
