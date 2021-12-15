import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface CategoryProps{
    isSelected: boolean;
}


export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme})=> theme.cores.background};
`;
export const Header = styled.View`
    background-color: ${({theme}) => theme.cores.primaria};
    width: 100%;
    height: ${RFValue(90)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;
export const Titulo = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fontes.regular};
    color: ${({theme}) => theme.cores.shape};
`;
export const Category = styled.TouchableOpacity<CategoryProps>`
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    background-color: ${({isSelected, theme}) => isSelected ? theme.cores.secundaria_light : theme.cores.background};
`; 
export const Icone = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`; 
export const Label = styled.Text`
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(14)}px;
`;
export const Separador = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({theme}) => theme.cores.texto};;
`;
export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`; 
