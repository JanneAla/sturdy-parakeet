import { executeReducerBuilderCallback } from "@reduxjs/toolkit/dist/mapBuilders"
import { FilterState, LibraryFilter, SortTypes } from "hooks/useLibrarySettings"

type SortOrderList = {
    label: string,
    key: SortTypes,
    ASC: "ascending",
    DESC: "descending"

}

export const LibrarySortOrderList: SortOrderList[] = [
    {
        label: "Name",
        key: "name",
        ASC: "ascending",
        DESC: "descending"
    },
    {
        label: "Release Date",
        key: "releaseDate",
        ASC: "ascending",
        DESC: "descending"
    },
    {
        label: "Paid Price",
        key: "paidPrice",
        ASC: "ascending",
        DESC: "descending"
    },
    {
        label: "Date Added",
        key: "dateAdded",
        ASC: "ascending",
        DESC: "descending"
    },
]

export const LibraryFiltersList: LibraryFilter = {
    platforms: [
        {
            console: "Playstation 3",
            state: "unchecked"
        },
        {
            console: "Playstation 4",
            state: "unchecked"
        },
        {
            console: "Playstation 5",
            state: "unchecked"
        },
        {
            console: "Nintendo Switch",
            state: "unchecked"
        }
    ],
    releaseStatus: "unchecked",
    owned: "unchecked"
}