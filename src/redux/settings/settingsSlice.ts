import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type FilterState = "notSelected" | "include" | "exclude"

type LibraryFilter = {
    platforms?: { console: string, state: FilterState }[],
    releaseStatus?: FilterState
}

type SortTypes = keyof LibrarySortOrder
type SortState = "ascending" | "descending"

type LibrarySortOrder = {
    name: string
    releaseDate: string
    paidPrice: number
    dateAdded: string
}

type LibrarySort = {
    type: SortTypes
    order: SortState
}
export interface SettingsState {
    filters: LibraryFilter
    productSort: LibrarySort
    showNumberOfProducts: boolean;
}

const initialState: SettingsState = {
    productSort: {
        type: "name",
        order: "ascending"
    },
    filters: {
        platforms: [
            { console: "Playstation 3", state: "notSelected" },
            { console: "Playstation 4", state: "notSelected" },
            { console: "Playstation 5", state: "notSelected" },
            { console: "Nintendo Switch", state: "notSelected" },
        ],
        releaseStatus: "notSelected"
    },
    showNumberOfProducts: false
}

export const librarySettingsSlice = createSlice({
    name: 'librarySettings',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<LibraryFilter>) => {
            state.filters = action.payload
        },
        setSort: (state, action: PayloadAction<LibrarySort>) => {
            state.productSort = action.payload
        },
        toggleSortOrder: (state) => {
            state.productSort.order =
                state.productSort.order === "ascending" ?
                    "descending" : "ascending"
        },
    },
})

// Action creators are generated for each case reducer function
export const { setFilters, setSort, toggleSortOrder } = librarySettingsSlice.actions

export default librarySettingsSlice.reducer