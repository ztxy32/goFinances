import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.cores.background};
`;
export const Header = styled.View`
    background-color: ${({theme}) => theme.cores.primaria};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`; 
export const Titulo = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fontes.regular};
    color: ${({theme}) => theme.cores.shape};
`;
export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;
    justify-content: space-between;
`;
export const Fields = styled.View`
`;
export const TransactionType = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
`;