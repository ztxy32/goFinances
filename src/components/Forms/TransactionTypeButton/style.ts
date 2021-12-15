import styled, {css} from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import {Feather} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionsProps{
    tipo: "up" | "down";
}
interface ButtonProps{
    tipo: "up" | "down";
    isSelected: boolean;
}

export const Container = styled.View<ButtonProps>`
    width: 48%;
    border: 1.5px solid ${({theme}) => theme.cores.texto};
    border-radius: 5px;
    ${({isSelected, tipo}) => isSelected && tipo === "up" && css`
        background-color: ${({theme}) => theme.cores.sucesso_light};
        border: none;
    `};
    ${({isSelected, tipo}) => isSelected && tipo === "down" && css`
        background-color: ${({theme}) => theme.cores.atencao_light};
        border: none;
    `};
`;
export const Button = styled(RectButton)`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 16px;
`;
export const Icone = styled(Feather)<TransactionsProps>`
    font-size: ${RFValue(24)}px;  
    margin-right: 12px;
    color: ${({theme, tipo}) => tipo === "up" ? theme.cores.sucesso : theme.cores.atencao};
`;  
export const Titulo = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fontes.regular};
`;