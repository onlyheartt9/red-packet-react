import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import routes from "./routes";

function App() {
  return (
    <NextUIProvider>
      <Router>
        <div>
          {/* 导航栏可以放在这里 */}

          {/* 使用Switch包裹Route，确保只渲染一个匹配的路由 */}
          <Switch>
            {/* 使用map函数生成Route组件 */}
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </NextUIProvider>
  );
}
export default App;
