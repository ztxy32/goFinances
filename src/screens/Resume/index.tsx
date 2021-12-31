import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Titulo, Content, ChartContainer, MonthSelector, 
    MonthSelectButton, MonthSelectIcon, Month, LoadingContainer, 
} from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/native";

const dataKey = "@goFinances:transactions";

interface TransactionData{
    tipo: "positive" | "negative";
    name: string;
    valor: string;
    categoria: string;
    dia: string;
}
interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume(){
    const [isLoading, setIsLoading] = useState(false);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const theme = useTheme();

    function handleSwitchDate(action: "previus" | "next"){
        if (action === "next"){
            setSelectedDate(addMonths(selectedDate, 1));
            //console.log(newDate)
        }else{
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData(){
        setIsLoading(true);
        const data = await AsyncStorage.getItem(dataKey)
        const formattedData = data ? JSON.parse(data) : [];

        const expensives = formattedData
        .filter((expensive: TransactionData) => 
        expensive.tipo === "negative" && 
        new Date(expensive.dia).getMonth() === selectedDate.getMonth() && 
        new Date(expensive.dia).getFullYear() === selectedDate.getFullYear()
        )

        const expensiveTotal = expensives
        .reduce((acumullator: number, expensive: TransactionData) => {
            return acumullator + Number(expensive.valor);
        }, 0)
        //console.log(expensiveTotal);

        const totalByCategory: CategoryData[] = [];
        categories.forEach(category => {
            let categorySum = 0;
            expensives.forEach((expensive: TransactionData) => {
                if(expensive.categoria === category.key){
                    categorySum += Number(expensive.valor);
                }
            });
            if(categorySum > 0){
                const totalFormatted = categorySum.toLocaleString("pt-Br",{
                    style: "currency",
                    currency: "BRL",
                })
                const percent = `${(categorySum / expensiveTotal * 100).toFixed(1)}%`
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                })
            }
            
            })
            setTotalByCategories(totalByCategory);
            setIsLoading(false);
        //console.log(totalByCategory)
    }
    useFocusEffect(
        useCallback( () => { loadData() },
            [selectedDate]
        )
    )

    return(            
        <Container>
            <Header>
                <Titulo>Resumo por categoria</Titulo>
            </Header>
            {
            isLoading ? 
                <LoadingContainer>
                    <ActivityIndicator color={theme.cores.primaria} size="large"/>
                </LoadingContainer> :
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >
                    <MonthSelector>
                        <MonthSelectButton onPress={() => handleSwitchDate("previus")}>
                            <MonthSelectIcon name="chevron-left"/>
                        </MonthSelectButton>

                        <Month>{format(selectedDate, "MMMM, yyyy", {locale: ptBR})}</Month>

                        <MonthSelectButton onPress={() => handleSwitchDate("next")}> 
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelector>
                    <ChartContainer>
                        <VictoryPie 
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: "bold",
                                    fill: theme.cores.shape,
                                },
                            }}
                            labelRadius={50}
                            x="percent"
                            y="total"
                        />
                    </ChartContainer>
                    {
                        totalByCategories.map(item => (
                            <HistoryCard 
                                key={item.key}
                                title={item.name}
                                color={item.color}
                                amount={item.totalFormatted}
                            />
                        ))
                    }
                </Content>
        }
        </Container>
    );
}