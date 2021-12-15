import styled, { ThemeConsumer } from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton} from "react-native-gesture-handler"


export const Container = styled(RectButton)`
    background-color: ${({theme}) => theme.cores.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 18px 16px;
`;
export const Categoria = styled.Text`
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(14)}px;
`; 
export const Icone = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.cores.texto}
`;