import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import { DataListProps } from ".";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.cores.background};
`;
export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.cores.primaria};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
`;


export const UserContainer = styled.View`
    width: 100%;
    padding: 0px 24px;
    margin-top: ${RFValue(30)}px; 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const User = styled.View`
    margin-left: 17px;
`; 
export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    
`; 
export const Picture = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`; 
export const UserGreeding = styled.Text`
    color: ${({theme}) => theme.cores.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fontes.regular};
`; 
export const UserName = styled.Text`
    color: ${({theme}) => theme.cores.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fontes.negrito};
`;
export const LogOutButton = styled(BorderlessButton)`
    
`;
export const LogOutIcon = styled(MaterialIcons)`
    color: ${({theme}) => theme.cores.secundaria};
    font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24},
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;
export const Transactions = styled.View`
    flex: 1%;
    padding: 0px 24px;
    margin-top: ${RFPercentage(12)}px;
`; 
export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fontes.regular};
    margin-bottom: 16px;
`;
export const TransactionsList = styled(
    FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>).attrs({
        showsVerticalScrollIndicator: false,
})``;
export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;