import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import { Container, Header, Titulo, Category, Icone, Label, Separador, Footer, } from "./style";


interface Category{
    key: string;
    name: string;
}
interface Props{
    category: Category;
    setCategy: (category: Category) => void;
    closeSelectedCartegory: () => void;
}

export function CategorySelect({category, setCategy, closeSelectedCartegory,}: Props){
    function handleCategorySelect(category: Category){
        setCategy(category)
    }
    return(
        <Container>
            <Header>
                <Titulo>Categoria</Titulo>
            </Header>
            <FlatList 
                data={categories}
                style={{flex: 1, width: "100%"}}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={Separador}
                renderItem={
                    ({item}) => 
                    <Category 
                        onPress={()=> handleCategorySelect(item)}
                        isSelected={category.key === item.key}
                    >
                        <Icone name={item.icon}/>
                        <Label>{item.name}</Label>
                    </Category>
                }
            />
            <Footer>
                <Button titulo="Seleccionar" onPress={closeSelectedCartegory}/>
            </Footer>
        </Container>
    );
}