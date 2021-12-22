import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Texto } from "./style";


interface Props extends RectButtonProps{
    title: string;
    svg: React.FC<SvgProps>;
}


export default function SignInSocialButton({title, svg: Svg, ...rest}: Props){
    return(
        <Button {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>
            <Texto>{title}</Texto>
        </Button>
    );
}