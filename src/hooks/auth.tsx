import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Alert } from "react-native";

const dataKey = "@gofinances:user";
const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

interface AuthProviderProps{
    children: ReactNode;
}
interface User{
    id: string;
    name: string;
    mail: string;
    picture?: string;
}
interface AuthorizationResponse{
    params: {
        access_token: string;
    }, 
    type: string;
}

interface AuthContextData{
    user: User;
    SignInWithGoogle(): Promise<void>;
    SignInWithApple(): Promise<void>;
    SignOut(): Promise<void>;
    loading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    async function SignInWithGoogle(){
        try{
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            
            const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if(type === "success"){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                const userLogged = {
                    id: String(userInfo.id),
                    mail: userInfo.email!,
                    name: userInfo.given_name!,
                    picture: userInfo.picture!,
                };
                setUser(userLogged);
                await AsyncStorage.setItem(dataKey, JSON.stringify(userLogged))
            }
        }catch (e: any){throw new Error(e);}
    }
    async function SignInWithApple(){
        try{
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                ]
            });
            if (credential){
                const name = credential.fullName?.givenName!;
                const picture = `https://ui-avatars.com/api/?name=${credential.fullName}&lenght=2`;
                const userLogged = {
                    id: credential.user,
                    mail: credential.email!,
                    name,
                    picture,
                };
                setUser(userLogged);
                await AsyncStorage.setItem(dataKey, JSON.stringify(userLogged))
            }
        }catch (error: any){throw new Error(error);}
    }
    async function SignOut(){
        Alert.alert("Fazer logout", "Tens certeza de que desejas sair?",[
            {
                text: "não",
                onPress: () => {},
            },
            {
                text: "sim",
                onPress: async function Logout(){
                    setUser({} as User)
                    await AsyncStorage.removeItem(dataKey)
                },
            },
        ],{cancelable: true})
    }

    useEffect(() => {
        async function loadUserStoragedData(): Promise<void>{
            const userStoraged = await AsyncStorage.getItem(dataKey);
            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
            setLoading(false);
        }
        loadUserStoragedData();
        
    }, []);

    return(
        <AuthContext.Provider value={{ user, SignInWithGoogle, SignInWithApple, SignOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const contexto = useContext(AuthContext)
    return contexto;
}

export {AuthProvider, useAuth}