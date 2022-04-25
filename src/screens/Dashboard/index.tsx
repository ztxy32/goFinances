import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { Container, Header, UserContainer, UserInfo, Picture, User, UserGreeding, UserName, 
    LogOutIcon, HighlightCards, Transactions, Title, TransactionsList, LogOutButton, 
    LoadingContainer,EmptyListImageContainer , EmptyListImage, EmptyListMessage
} from "./style";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import emptyListImage from "../../assets/emptyList.png";
import { useAuth } from "../../hooks/auth";


export interface DataListProps extends TransactionCardProps{
    id: string;
}
interface HighlightProps{
    amount: string;
    lastTransaction: string;
}
interface HighlightData{
    entries: HighlightProps;
    expensive: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const theme = useTheme();
    const { SignOut, user} = useAuth();
    const dataKey = `@goFinances:transactions_user:${user.id}`;

    function getLastTransactionDate(collection: DataListProps[], tipo: "positive" | "negative"){
        if (collection.length > 0){
            const lasTransaction = Math.max.apply(Math, collection
                .filter(transactions => transactions.tipo === tipo)
                .map(transactions => new Date(transactions.dia).getTime()))

                return Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit", 
                    month: "long", 
                    year: "2-digit",
                }).format(new Date(lasTransaction));
            }
    }

    async function loadTransactions(){
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {
                if(item.tipo === "positive"){
                    entriesTotal += Number(item.valor)
                }else{
                    expensiveTotal += Number(item.valor)
                }

                const valor = Number(item.valor).toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
                
                const dia = Intl.DateTimeFormat("pt-BR", {day: "2-digit", month: "2-digit", year: "2-digit",}).format(new Date(item.dia));
                
                return{
                    id: item.id, 
                    name: item.name,
                    valor,
                    tipo: item.tipo,
                    categoria: item.categoria,
                    dia,
                }
            });

            setTransactions(transactionsFormatted)
            
            const lastTransactionEntries = getLastTransactionDate(transactions, "positive");
            const lastTransactionExpensive = getLastTransactionDate(transactions, "negative");
            const totalInterval = lastTransactionExpensive != null ? `01 a ${lastTransactionExpensive}` : "Dados insuficientes";

            const total = entriesTotal - expensiveTotal;
            setHighlightData({
                entries:{
                    amount: entriesTotal.toLocaleString("pt-BR",{
                        style: "currency",
                        currency: "BRL"
                    }),
                    lastTransaction: lastTransactionEntries != null ? `Última entrada dia ${lastTransactionEntries} ` : "Última entrada nunca",
                },
                expensive:{
                    amount: expensiveTotal.toLocaleString("pt-BR",{
                        style: "currency",
                        currency: "BRL"
                    }),
                    lastTransaction: lastTransactionExpensive != null ? `Última saída dia ${lastTransactionExpensive}` : "Última entrada nunca" ,
                },
                total: {
                    amount: total.toLocaleString("pt-BR",{
                        style: "currency",
                        currency: "BRL"
                    }),
                    lastTransaction: totalInterval,
                }
            });
        setIsLoading(false)
            
    }

    useEffect(() => {
        loadTransactions()
    }, [])
    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]))
    
    return(
        <Container>
            {
            isLoading ? 
            <LoadingContainer>
                <ActivityIndicator color={theme.cores.primaria} size="large"/>
            </LoadingContainer> :
            <>
                <Header>
                    <UserContainer>
                        <UserInfo>
                            <Picture source={
                                {uri: user.picture}
                            }/>
                            <User>
                                <UserGreeding>Olá, </UserGreeding>
                                <UserName>{user.name}</UserName>
                            </User>
                        </UserInfo>
                        <LogOutButton onPress={SignOut}>
                            <LogOutIcon name="logout"/>
                        </LogOutButton>
                        
                    </UserContainer>
                </Header>
                <HighlightCards>
                    <HighlightCard
                        type="up"
                        title="Entradas"
                        amount={highlightData.entries.amount}
                        lastTransaction={highlightData.entries.lastTransaction}
                    />
                    <HighlightCard
                        type="down"
                        title="Saídas"
                        amount={highlightData.expensive.amount}
                        lastTransaction={highlightData.expensive.lastTransaction}
                    />
                    <HighlightCard
                        type="total"
                        title="Total"
                        amount={highlightData.total.amount}
                        lastTransaction={highlightData.total.lastTransaction}
                    />
                </HighlightCards>
                <Transactions>
                    <Title>Histórico</Title>
                    <TransactionsList 
                        inverted
                        data={transactions} 
                        keyExtractor={item => item.id}
                        renderItem={ ({item}) => <TransactionCard dados={item}/> } 
                        ListEmptyComponent={
                            <EmptyListImageContainer>
                                <EmptyListImage source={emptyListImage}/>
                                <EmptyListMessage>Nenhum item encontrado :/</EmptyListMessage>
                            </EmptyListImageContainer> 
                        } 
                    />                 
                </Transactions>
            </>
            }
            
        </Container>
    )
}