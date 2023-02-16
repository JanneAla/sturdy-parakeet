import AsyncStorage from "@react-native-async-storage/async-storage"

const useAsyncStorage = () => {
    async function getItem <T>(key: string): Promise<T> {
            return AsyncStorage.getItem(`@${key}`)
                .then(res => res ? JSON.parse(res) : {})
                .catch(e => console.error(e))
            
    }
    async function setItem<T>(key: string, value: T) {
            const json = JSON.stringify(value)
            AsyncStorage.setItem(`@${key}`, json)
                .catch(e => console.error(e))
    }
    return {getItem, setItem}
}

export default useAsyncStorage