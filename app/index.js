import React from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import ScreenNav from './screens/ScreenNav';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return <ScreenNav />;
}
