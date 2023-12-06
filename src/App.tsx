import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import routes from './routes/index';

function App() {
  return (
    <NextUIProvider>
      <Router>
        <div>
          {/* 导航栏可以放在这里 */}
          <Routes>
            {/* 使用Switch包裹Route，确保只渲染一个匹配的路由 */}
            <Route>
              {/* 使用map函数生成Route组件 */}
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          </Routes>
        </div>
      </Router>
    </NextUIProvider>
  );
}
export default App;
