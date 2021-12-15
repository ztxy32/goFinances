import styled from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionType{
    tipo: "positive" | "negative";
}

export const Container = styled.View`
    background-color: ${({theme}) => theme.cores.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 10px;
`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(14)}px;
`; 
export const Amount = styled.Text<TransactionType>`
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(20)}px;
    margin-top: 2px;
    color: ${({theme, tipo}) => tipo === "positive" ? theme.cores.sucesso : theme.cores.atencao}
`; 
export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`; 
export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`; 
export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.cores.texto};
`; 
export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.cores.texto};
    margin-left: 17px;
`; 
export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.cores.texto};
`;