import React from "react";
import { Container, Categoria, Icone, } from "./style";

interface Props{
    titulo: string;
    onPress: () => void;
}

export function CategorySelectButton({titulo, onPress}:Props){
    return(
        <Container onPress={onPress}>
            <Categoria>{titulo}</Categoria>
            <Icone name="chevron-down"/>
        </Container>
    );
}