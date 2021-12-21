import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from "./style";


export function Entrar(){
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
                    <SignInSocialButton title="Entrar com o Google" svg={GoogleSvg}/>
                    <SignInSocialButton title="Entrar com a Apple" svg={AppleSvg}/>
                </FooterWrapper>
                
            </Footer>
        </Container>
    );
}