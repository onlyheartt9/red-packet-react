import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Button } from '@nextui-org/react';

const Home = () => {
  return (
    <NextUIProvider>
      <div>
        <Button color="primary">Home</Button>
      </div>
    </NextUIProvider>
  );
};
export default Home;
