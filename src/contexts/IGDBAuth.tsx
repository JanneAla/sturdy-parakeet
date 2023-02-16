import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import useAsyncStorage from "hooks/useAsyncStorage"
import React from "react"
import { ClientId, ClientSecret } from '../../secrets.json'

type Token = {
    "access_token": string,
    "expires_in": number,
    "token_type": "bearer",
    "token_set_time": number
}

const storage = useAsyncStorage()

const IgdbApi = {
    login: (): Promise<string> => {
        return storage.getItem<Token>("token")
            .then(async (token) => {
                const nowInSeconds = Math.round(new Date().getTime() / 1000)
                if (nowInSeconds < (token.token_set_time / 1000) + token.expires_in) {
                    return Promise.resolve(token.access_token)
                }

                const url = `https://id.twitch.tv/oauth2/token?client_id=${ClientId}&client_secret=${ClientSecret}&grant_type=client_credentials`
                return fetch(url, { method: "POST" })
                    .then((res) => res.json())
                    .then(async (token) => {
                        const newToken = {
                            ...token,
                            token_set_time: new Date().getTime()
                        }
                        await storage.setItem("token", newToken)
                        return newToken.access_token
                    })
                    .catch((error) => {
                        const message = error.toString();
                        return message;
                    })
            })
    }
}

export const IgdbApiContext = React.createContext(IgdbApi)

export default function IgdbApiProvider({ children }: { children: React.ReactNode }) {
    return (
        <IgdbApiContext.Provider value={IgdbApi} >
            {children}
        </IgdbApiContext.Provider>
    )
}

