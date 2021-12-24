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


const dataKey = "@goFinances:transactions";

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const theme = useTheme();

    function getLastTransactionDate(collection: DataListProps[], tipo: "positive" | "negative"){
        if (collection.length > 0){
        const lasTransaction = Math.max.apply(Math, collection
            .filter(transactions => transactions.tipo === tipo)
            .map(transactions => new Date(transactions.dia).getTime()))

            return Intl.DateTimeFormat("pt-BR", {
                day: "2-digit", 
                month: "long", 
                year: "2-digit",
            }).format(new Date(lasTransaction));}
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

                const valor = Number(item.valor)
                    .toLocaleString("pt-BR", {
                        style: "currency", 
                        currency: "BRL"
                    });

                const dia = Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit", 
                        month: "2-digit", 
                        year: "2-digit",
                    }).format(new Date(item.dia));
                
                return{
                    id: item.id, 
                    name: item.name,
                    valor: valor,
                    tipo: item.tipo,
                    categoria: item.categoria,
                    dia: dia,
                }
            });

            setTransactions(transactionsFormatted)
            
            const lastTransactionEntries = getLastTransactionDate(transactions, "positive");
            const lastTransactionExpensive = getLastTransactionDate(transactions, "negative");
            const totalInterval = lastTransactionExpensive != null ? `01 a ${lastTransactionExpensive}` : "Nenhum período";

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
                    lastTransaction: lastTransactionExpensive != null ? `Última saída dia ${lastTransactionExpensive}` : "Última saída nunca" ,
                },
                total: {
                    amount: total.toLocaleString("pt-BR",{
                        style: "currency",
                        currency: "BRL"
                    }),
                    lastTransaction: totalInterval,
                }
            });
            //console.log(transactionsFormatted)
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
                                {uri: "https://avatars.githubusercontent.com/u/35979271?s=400&u=37b1cd99ed95de4f5601df3f6392736560c992a5&v=4"}
                            }/>
                            <User>
                                <UserGreeding>Olá, </UserGreeding>
                                <UserName>Erys</UserName>
                            </User>
                        </UserInfo>
                        <LogOutButton onPress={() => {} }>
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