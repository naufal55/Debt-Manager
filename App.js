import React from 'react';
import Container from './Container';
import { NativeBaseProvider, extendTheme } from "native-base";
import AppLoading from 'expo-app-loading';

// Import font with Expo
import {
  BalsamiqSans_400Regular,
  BalsamiqSans_400Regular_Italic,
  useFonts,
} from '@expo-google-fonts/balsamiq-sans'


const App = ()=> {
  let [fonstLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic
  })

  // Setup Font
  const fontConfig = {
    BalsamiqSans: {
      400: {
        normal: 'BalsamiqSans_400Regular',
        italic: 'BalsamiqSans_400Regular_Italic'
      }
    }
  }

  // Setup Theme
  const customeColor =  {
    primary: {
      50: '#dbf4ff',
      100: '#addbff',
      200: '#7cc2ff',
      300: '#4aa9ff',
      400: '#1a91ff',
      500: '#0077e6',
      600: '#005db4',
      700: '#004282',
      800: '#002851',
      900: '#000e21',
    }
  }

  // Configuration Native Base Custom Theme
  const theme = extendTheme({
    colors: customeColor,
    fontConfig,
    font: {
      heading: "BalsamiqSans",
      body: "BalsamiqSans",
      mono: "BalsamiqSans",
    },
    config: {
      initialColorMode: 'dark'
    }
  })

  if(!fonstLoaded){
    return <AppLoading />
  } else {
    return (
      // Setup Provider
      <NativeBaseProvider theme={theme}>
        <Container />
      </NativeBaseProvider>
    );
  }
}
export default App;

