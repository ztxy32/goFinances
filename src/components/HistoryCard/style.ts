import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


interface ContainerProps{ color: string }

export const Container= styled.View<ContainerProps>`
    width: 100%;
    background-color: ${({theme}) => theme.cores.shape};
    flex-direction: row;
    justify-content: space-between;
    padding: 14px 24px;    
    border-radius: 5px;
    border-left-width: 5px;
    border-left-color: ${({color}) => color};
    margin-bottom: 8px;
`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(15)}px;
`;
export const Amount = styled.Text`
    font-family: ${({theme}) => theme.fontes.negrito};
    font-size: ${RFValue(15)}px;
`;

