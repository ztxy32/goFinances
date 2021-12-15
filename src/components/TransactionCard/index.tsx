import React from "react";
import { categories } from "../../utils/categories";
import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date, } from "./style";


export interface TransactionCardProps{
    tipo: "positive" | "negative";
    name: string;
    valor: string;
    categoria: string;
    dia: string;
}
interface Props{
    dados: TransactionCardProps;
}

export function TransactionCard({dados}: Props){
    const [ category ] = categories.filter(
        item => item.key === dados.categoria
    );
    return(
        <Container>
            <Title>{dados.name}</Title>
            <Amount tipo={dados.tipo}>
                {dados.tipo === "negative" ? "- " + dados.valor : dados.valor}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon}></Icon>
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{dados.dia}</Date>                
            </Footer>
        </Container>
    );
}