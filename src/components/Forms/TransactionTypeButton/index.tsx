import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icone,  Titulo, Button} from "./style";

interface Props extends RectButtonProps{
    titulo: string;
    tipo: "up" | "down";
    isSelected: boolean;
}
const icones = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
}

export function TransactionTypeButton({titulo, tipo,isSelected, ...rest}: Props){
    return(
        <Container tipo={tipo} isSelected={isSelected}>
            <Button {...rest}>
                <Icone name={icones[tipo]} tipo={tipo}/>
                <Titulo>{titulo}</Titulo>
            </Button>
        </Container>
    );
}