import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';



export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
  })
  const {loading} = useAuth()
  if(!fontsLoaded || loading){return <AppLoading/>}
  return (
    <>
      <StatusBar />
      <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes/>
          </AuthProvider>
      </ThemeProvider>
    </>
  )
}
