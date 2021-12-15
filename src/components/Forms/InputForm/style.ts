import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
`;
export const Error = styled.Text`
    color: ${({theme}) => theme.cores.atencao};
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(14)}px;
    margin: 7px;
`;