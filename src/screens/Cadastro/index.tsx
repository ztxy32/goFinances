//react stuff
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Yup from  "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

//my stuff
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Header, Titulo, Form, Fields,TransactionType } from "./style";


interface DadosDoFormulario{
    nome: string;
    valor: string;
}
const schema = Yup.object().shape({
    nome: Yup
        .string()
        .required('A propriedade nome é obrigatória'),
    valor: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('A propriedade preço é obrigatória')
})

export function Cadastro(){
    const [category, setCategory] = useState({
        key: "category",
        name: "categoria",
    });
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const navegacao = useNavigation();
    const dataKey = "@goFinances:transactions";

    const {control, handleSubmit, reset, formState: { errors }} = useForm({resolver: yupResolver(schema)});

    function handleTransactionTypeSelect(tipo: "positive" | "negative"){
        setTransactionType(tipo)
    }
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }
    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }
    async function handleCadastrar(form: DadosDoFormulario){
        if(!transactionType){
            return Alert.alert("Seleccione o tipo da transação!")
        }
        if(category.key === "category"){
            return Alert.alert("Seleccione a categoria!")
        }
        const newTransaction = {
            id: String(uuid.v4()),
            name: form.nome,
            valor: form.valor,
            tipo: transactionType,
            categoria: category.key,
            dia: new Date(),
        }
        try{
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const formattedData = [...currentData, newTransaction];
            
            /*async function delet(){
                await AsyncStorage.removeItem(dataKey)
            }
            delet()*/
            await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));
            //console.log(formattedData)
            reset();
            setTransactionType("");
            setCategory({key: "category", name: "categoria"});
            navegacao.navigate("Listagem");
        }catch(error){
            console.log(error)
            Alert.alert("Error ao cadastrar os dados")
        }
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Titulo>Cadastro</Titulo>
                </Header>
                <Form>
                    <Fields>
                        <InputForm 
                            name="nome"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.nome && errors.nome.message}
                        />
                        <InputForm 
                            name="valor"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.valor && errors.valor.message}
                        />
                        <TransactionType>
                            <TransactionTypeButton 
                                tipo="up" 
                                titulo="Entrada" 
                                onPress={() => handleTransactionTypeSelect("positive")}
                                isSelected={transactionType === "positive"}
                            />
                            <TransactionTypeButton 
                                tipo="down" 
                                titulo="Saída" 
                                onPress={() => handleTransactionTypeSelect("negative")}
                                isSelected={transactionType === "negative"}
                            />
                        </TransactionType>
                        <CategorySelectButton titulo={category.name} onPress={handleOpenSelectCategoryModal}/>
                    </Fields>
                    <Button titulo="Enviar" onPress={handleSubmit(handleCadastrar)} />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategy={setCategory}
                        closeSelectedCartegory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}