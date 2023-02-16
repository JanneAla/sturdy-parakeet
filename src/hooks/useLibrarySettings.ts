export type FilterState = "checked" | "crossed" | "unchecked"

export type LibraryFilter = {
    platforms?:
    { console: string, state: FilterState }[]
    ,
    releaseStatus?: FilterState,
    owned?: FilterState
}

export type SortState = "ascending" | "descending"

type LibrarySortOrder = {
    name: string
    releaseDate: string
    paidPrice: number,
    dateAdded: string,
}

export type SortTypes = keyof LibrarySortOrder
type LibrarySort = {
    type: SortTypes
    order: SortState
}

export type LibrarySettings = {
    sortOrder: LibrarySort
    filters: LibraryFilter
}

import { useMMKVObject } from 'react-native-mmkv';

export const useLibrarySettings = () => {
    const [librarySettings, setSettings] =
        useMMKVObject<LibrarySettings>('LibrarySettings');

    const setLibrarySettings = (value: Partial<LibrarySettings>) => {
        setSettings({ ...librarySettings, ...value });
    }
    
    return {
        ...librarySettings,
        setLibrarySettings,
    };
};