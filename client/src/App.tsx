import { RouterProvider } from "react-router-dom";
import { AuthorizedRouter, UnauthorizedRouter } from "@src/router";
import { ConfigProvider } from "antd";
import { useTheme } from "@src/hook/use-theme.hook";
import { App as AntdContext } from "antd";
import { BgPreload } from "@src/layout/Bg-Preload/Bg-Preload";
import { useAppSelector } from "@src/hook";

export function App() {
   const { isLogin } = useAppSelector(state => state.authReducer)

   const { theme } = useTheme();

   return (
      <ConfigProvider theme={ theme }>
         <AntdContext>
            <RouterProvider router={ isLogin ? AuthorizedRouter : UnauthorizedRouter }/>
            <BgPreload/>
         </AntdContext>
      </ConfigProvider>
   );
}
