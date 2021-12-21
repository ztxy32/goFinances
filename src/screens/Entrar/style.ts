import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;
export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme}) => theme.cores.primaria};
    justify-content: flex-end;
    align-items: center;
`;
export const TitleWrapper = styled.View`
    align-items: center;
`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fontes.medio};
    color: ${({theme}) => theme.cores.shape};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top: 45px;
`;
export const SignInTitle = styled.Text`
    font-family: ${({theme}) => theme.fontes.regular};
    color: ${({theme}) => theme.cores.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 67px;
`;
export const Footer = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme}) => theme.cores.secundaria};
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0px 32px;
    justify-content: space-between;
`;
