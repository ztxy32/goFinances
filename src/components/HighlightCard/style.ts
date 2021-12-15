import styled, {css} from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Feather} from "@expo/vector-icons";

interface TypeProps{
    type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps> `
    background-color: ${({theme, type}) => type === "total" ? theme.cores.secundaria : theme.cores.shape};
    width: ${RFValue(275)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;
`;

export const Header = styled.View `
    flex-direction: row;
    justify-content: space-between;
`;
export const Title = styled.Text<TypeProps> `
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme, type}) => type === "total" ? theme.cores.shape : theme.cores.texto_dark};
`;
export const Icon = styled(Feather)<TypeProps> `
    font-size: ${RFValue(40)}px;
    ${({type}) => type === 'up' && css `
        color: ${({theme}) => theme.cores.sucesso};
    `}
    ${({type}) => type === 'down' && css `
        color: ${({theme}) => theme.cores.atencao};
    `}
    ${({type}) => type === 'total' && css `
        color: ${({theme}) => theme.cores.shape};
    `}
`;
export const Content = styled.View `

`;
export const Amount = styled.Text<TypeProps> `
    font-family: ${({theme}) => theme.fontes.medio};
    font-size: ${RFValue(32)}px;
    color: ${({theme, type}) => type === "total" ? theme.cores.shape : theme.cores.texto_dark};
    margin-top: 38px;
`;
export const  LastTransaction = styled.Text<TypeProps> `
    font-family: ${({theme}) => theme.fontes.regular};
    color: ${({theme, type}) => type === "total" ? theme.cores.shape : theme.cores.texto};
    font-size: ${RFValue(12)}px;
`;