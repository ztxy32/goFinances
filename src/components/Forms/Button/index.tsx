import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Titulo } from "./style";

interface Props extends RectButtonProps{
    titulo: string;
    onPress: () => void;
}

export function Button({titulo,onPress, ...rest}: Props){
    return(
        <Container onPress={onPress} {...rest}>
            <Titulo>{titulo}</Titulo>
        </Container>
    );
}