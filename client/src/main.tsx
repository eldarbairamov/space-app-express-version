import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "@src/App";
import { Provider } from "react-redux";
import { store } from "@src/redux";

import "@src/style/normalize.scss";
import "@src/style/baseline.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <Provider store={ store }>
      <App/>
   </Provider>,
);
