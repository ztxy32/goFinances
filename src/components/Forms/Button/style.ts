import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
    width: 100%;
    background-color: ${({theme}) => theme.cores.secundaria};
    border-radius: 5px;
    align-items: center;
    padding: 18px;
`;
export const Titulo = styled.Text`
    color: ${({theme}) => theme.cores.shape};
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fontes.medio};    
`;