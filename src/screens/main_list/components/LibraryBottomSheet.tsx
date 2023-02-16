import React, { Ref, useEffect } from "react";
import { BackHandler, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { overlay, Text, Checkbox as PaperCheckbox, List } from "react-native-paper";
import { default as BS, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "hooks/useTheme";
import BottomSheet from "components/BottomSheet";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { FilterState, LibraryFilter, useLibrarySettings } from "hooks/useLibrarySettings";
import { Checkbox, SortItem } from "components/Checkbox";
import { LibrarySortOrderList, LibraryFiltersList } from "../Constants";
import { FlashList } from "@shopify/flash-list";
import { ThreeStateCheckbox } from "components/ThreeStateCheckbox";
import { ScrollView } from "react-native-gesture-handler";
import { filter } from "cheerio/lib/api/traversing";

const color = require('color')

interface LibraryBottomSheetProps {
  bottomSheetRef: Ref<BS> | null;
}


function FirstRoute() {
  const theme = useTheme()
  const { sortOrder, setLibrarySettings } = useLibrarySettings()

  function decideStatus(item: any) {
    return item.key === sortOrder?.type
      ? sortOrder?.order === item.ASC
        ? 'asc'
        : sortOrder?.order === item.DESC
          ? 'desc'
          : undefined : undefined
  }
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        estimatedItemSize={6}
        data={LibrarySortOrderList}
        extraData={[sortOrder]}
        renderItem={(({ item }) => (
          <SortItem
            label={item.label}
            theme={theme}
            status={
              decideStatus(item)
            }
            onPress={() => {
              setLibrarySettings({
                sortOrder: {
                  type: item.key,
                  order: sortOrder?.type === item.key ? (sortOrder?.order === item.ASC ? item.DESC : item.ASC) : "ascending"
                }
              })
            }}
          />
        ))}
      />
      {/* <View>
        <Text>{sortOrder?.type}</Text>
        <Text>{sortOrder?.order || "order"}</Text>
      </View> */}
    </View>
  );
}

function SecondRoute() {
  const theme = useTheme()
  const { filters, setLibrarySettings } = useLibrarySettings()

  function onPressPlatform(item: { console: string, state: FilterState }) {
    const fCopy = filters as LibraryFilter
    const platforms = fCopy.platforms
    const index = platforms!.findIndex((platform) => platform.console === item.console)

    if (index < 0) return;
    const state = platforms![index].state
    if (state === "unchecked")
      platforms![index].state = "checked"
    else if (state === "checked")
      platforms![index].state = "crossed"
    else if (state === "crossed")
      platforms![index].state = "unchecked"
    else
      platforms![index].state = "unchecked"

    setLibrarySettings({
      filters: {
        platforms: platforms,
        releaseStatus: filters?.releaseStatus,
        owned: filters?.owned
      }
    })
  }
  function statusCheckPlatform(item: { console: string, state: FilterState }): 'checked' | 'crossed' | 'unchecked' {
    const platform = filters?.platforms?.find((platform) => platform.console === item.console)
    if (platform != undefined) return platform.state
    return "unchecked"
  }

  function onPressReleased() {
    const fCopy = filters as LibraryFilter

    const state = fCopy.releaseStatus
    if (state === "unchecked")
      fCopy.releaseStatus = "checked"
    else if (state === "checked")
      fCopy.releaseStatus = "crossed"
    else if (state === "crossed")
      fCopy.releaseStatus = "unchecked"
    else
      fCopy.releaseStatus = "unchecked"

    setLibrarySettings({
      filters: {
        platforms: filters?.platforms,
        releaseStatus: fCopy.releaseStatus,
        owned: filters?.owned
      }
    })
  }
  function statusCheckReleased(): 'checked' | 'crossed' | 'unchecked' {
    return filters?.releaseStatus || 'unchecked'
  }

  function onPressOwned() {
    const fCopy = filters as LibraryFilter

    const state = fCopy.owned
    if (state === "unchecked")
      fCopy.owned = "checked"
    else if (state === "checked")
      fCopy.owned = "crossed"
    else if (state === "crossed")
      fCopy.owned = "unchecked"
    else
      fCopy.owned = "unchecked"

    setLibrarySettings({
      filters: {
        platforms: filters?.platforms,
        releaseStatus: filters?.releaseStatus,
        owned: fCopy.owned
      }
    })
  }
  function statusCheckOwned(): 'checked' | 'crossed' | 'unchecked' {
    return filters?.owned || 'unchecked'
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <List.Section>
          <List.Accordion title={"Platforms"}>
            {LibraryFiltersList.platforms!.map((item, index) => (
              <ThreeStateCheckbox
                key={index}
                label={item.console}
                status={statusCheckPlatform(item)}
                onPress={() => onPressPlatform(item)}
                theme={theme}
              />
            ))}
          </List.Accordion>
          <ThreeStateCheckbox
            label={"Released"}
            status={statusCheckReleased()}
            onPress={() => onPressReleased()}
            theme={theme}
          />
          <ThreeStateCheckbox
            label={"Owned"}
            status={statusCheckOwned()}
            onPress={() => onPressOwned()}
            theme={theme}
          />
        </List.Section>
      </ScrollView>
    </View>
  )
}


const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function LibraryBottomSheet({ bottomSheetRef }: LibraryBottomSheetProps) {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Sort' },
    { key: 'second', title: 'Filter' },
  ]);
  const theme = useTheme();
  const layout = useWindowDimensions();

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.primary }}
      style={[
        {
          backgroundColor: overlay(2, theme.surface),
          borderBottomColor: color(theme.isDark ? '#FFFFFF' : '#000000')
            .alpha(0.12)
            .string(),
        },
        styles.tabBar,
      ]}
      renderLabel={({ route, color }) => (
        <Text style={{ color }}>{route.title}</Text>
      )}
      inactiveColor={theme.textColorSecondary}
      activeColor={theme.primary}
      pressColor={color(theme.primary).alpha(0.12).string()}
    />
  );

  return (
    <BottomSheet
      bottomSheetRef={bottomSheetRef}
      // snapPoints={[520]}
      snapPoints={['50%']}
      height={520}
      theme={theme}
    >
      <BottomSheetView
        style={[
          styles.bottomSheetCtn,
          { backgroundColor: overlay(2, theme.surface) },
        ]}
      >
        <TabView
          navigationState={{ index, routes }}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          style={styles.tabView}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

export default LibraryBottomSheet

const styles = StyleSheet.create({
  bottomSheetCtn: {
    flex: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  tabView: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  sectionHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  tabBar: {
    borderBottomWidth: 1,
    elevation: 0,
  },
  pressable: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 24,
    alignSelf: 'center',
  },
  defaultLabel: {
    marginLeft: 12,
  },
});