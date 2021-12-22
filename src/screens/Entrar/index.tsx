import React from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from "./style";


export function Entrar(){
    const { SignInWithGoogle, SignInWithApple } = useAuth();

    async function handleSignInWithGoodle(){
        try{
            await SignInWithGoogle();
        }catch(error){
            console.log(error)
            Alert.alert("Não foi possível conectar à conta Google")
        }
    }
    async function handleSignInWithApple(){
        try{
            await SignInWithApple();
        }catch(error){
            console.log(error)
            Alert.alert("Não foi possível conectar à conta Apple")
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
                    <SignInSocialButton title="Entrar com a Apple" svg={AppleSvg} onPress={handleSignInWithApple}/>
                </FooterWrapper>
                
            </Footer>
        </Container>
    );
}