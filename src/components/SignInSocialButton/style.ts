import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";


export const Button = styled(RectButton)`
    height: ${RFValue(56)}px;
    background-color: ${({theme}) => theme.cores.shape};
    border-radius: 5px;
    align-items: center;
    flex-direction: row;
    margin-bottom: 15px;
`;
export const ImageContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: ${({theme}) => theme.cores.background};
    border-right-width: 1px;
`;
export const Texto = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({theme}) => theme.fontes.medio};
    font-size: ${RFValue(14)}px;
`;