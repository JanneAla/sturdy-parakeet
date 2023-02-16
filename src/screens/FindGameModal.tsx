import { NavigationProp, useNavigation } from '@react-navigation/native';
import Searchbar from 'components/SearchBar';
import { IgdbApiContext } from 'contexts/IGDBAuth';
import useIGDBApi from 'hooks/useIGDBApi';
import useSearch from 'hooks/useSearch';
import { useTheme } from 'hooks/useTheme';
import { RawIgdpProduct } from 'interfaces/IgdbProduct';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Text, TouchableRipple, ActivityIndicator, overlay } from 'react-native-paper';

type Props = {
  navigation: NavigationProp<any, any>
}
const FindGameModal = ({ navigation }: Props) => {

  const [data, setData] = React.useState<Partial<RawIgdpProduct[]>>()
  const [loading, setLoading] = React.useState(false)
  const { searchText, setSearchText, clearSearchbar } = useSearch()
  const theme = useTheme()
  const igdb = useIGDBApi();
  const auth = React.useContext(IgdbApiContext)

  const getFromApi = async () => {
    setLoading(true)
    const token = await auth.login()
    igdb.queryByName(token, searchText)
      .then(res => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  const navigateToGame = (id: string) => {
    navigation.navigate("Add", { id })
  }

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        searchText={searchText}
        onChangeText={setSearchText}
        clearSearchbar={clearSearchbar}
        placeholder="Search"
        handleBackAction={navigation.goBack}
        leftIcon="magnify"
        theme={theme}
        onSubmitEditing={getFromApi}
      />
      <View style={{
        borderBottomWidth: 1,
        borderBottomColor: overlay(5, theme.background)
      }} />
      <View style={{ flex: 1, margin: 20 }}>
        {loading && <ActivityIndicator animating={loading} size="large" style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }} />}
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <TouchableRipple key={index} style={{ marginVertical: 4 }} onPress={() => navigateToGame(item.id)}>
              <>
                <Text style={{ color: 'white' }}>Name: {item.name}</Text>
                <Text style={{ color: 'white' }}>Consoles: {item.platforms?.map(p => p.name).join(", ")}</Text>
              </>
            </TouchableRipple>
          )}
        />
      </View>
    </View>
  );
};

export default FindGameModal;