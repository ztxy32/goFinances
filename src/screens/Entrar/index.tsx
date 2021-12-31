import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from "./style";


export function Entrar(){
    const { SignInWithGoogle, SignInWithApple } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    async function handleSignInWithGoodle(){
        try{
            setIsLoading(true);
            return await SignInWithGoogle();
        }catch(error){
            console.log(error)
            Alert.alert("Não foi possível conectar à conta Google")
            setIsLoading(false)
        }
    }
    async function handleSignInWithApple(){
        try{
            setIsLoading(true);
            return await SignInWithApple();
        }catch(error){
            console.log(error)
            Alert.alert("Não foi possível conectar à conta Apple")
            setIsLoading(false)
        }
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)} 
                        height={RFValue(68)} 
                    />
                    <Title>Controle vossas{"\n"} financas de forma{"\n"} demasiada simples</Title>
                </TitleWrapper>
                <SignInTitle>Faça login com{"\n"} uma das contas abaixo</SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title="Entrar com o Google" svg={GoogleSvg} onPress={handleSignInWithGoodle}/>
                    {Platform.OS === "ios" &&
                        <SignInSocialButton title="Entrar com a Apple" svg={AppleSvg} onPress={handleSignInWithApple}/>
                    }
                    
                </FooterWrapper>
                {isLoading && <ActivityIndicator color={theme.cores.shape} />}
            </Footer>
        </Container>
    );
}