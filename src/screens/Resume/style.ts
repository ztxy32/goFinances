import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

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
export const Content = styled.ScrollView``;
export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const MonthSelector = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`; 
export const MonthSelectButton = styled(BorderlessButton)`
`; 
export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(25)}px;
`; 
export const Month = styled.Text`
    font-family: ${({theme}) => theme.fontes.regular};
    font-size: ${RFValue(20)}px;
`;

export const ChartContainer = styled.View`
    width: 95%;
    align-items: center;
`;