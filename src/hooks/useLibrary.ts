import { database } from 'db';
import { IFullProductData } from 'interfaces/product';
import IgdbProduct from 'models/IgdbProduct';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SortState, SortTypes, useLibrarySettings } from './useLibrarySettings';
const moment = require('moment')

const useLibrary = () => {

    const [baseLibrary, setBaseLibrary] = useState<IgdbProduct[]>([])
    const [library, setLibrary] = useState<IgdbProduct[]>([])
    const { sortOrder, filters } = useLibrarySettings()


    const fetchLibraryItems = useCallback(async () => {
        const products = await database.get<IgdbProduct>("igdbProducts").query().fetch()
        setBaseLibrary(products)
    }, [])


    function sortLibraryBy(key: SortTypes, order: SortState) {
        if (key == "name" && order == "ascending")
            setLibrary([...baseLibrary].sort(sortByNameAscending))
        else if (key == "name" && order == "descending")
            setLibrary([...baseLibrary].sort(sortByNameDescending))
        else if (key == "releaseDate" && order == "ascending")
            setLibrary([...baseLibrary].sort(sortByReleaseDateAscending))
        else if (key == "releaseDate" && order == "descending")
            setLibrary([...baseLibrary].sort(sortByReleaseDateDescending))
        else if (key == "paidPrice" && order == "ascending")
            setLibrary([...baseLibrary].sort(sortByPaidPriceAscending))
        else if (key == "paidPrice" && order == "descending")
            setLibrary([...baseLibrary].sort(sortByPaidPriceDescending))
        else if (key == "dateAdded" && order == "ascending")
            setLibrary([...baseLibrary].sort(sortByDateAddedAscending))
        else if (key == "dateAdded" && order == "descending")
            setLibrary([...baseLibrary].sort(sortByDateAddedDescending))
    }

    function filterLibrary() {
        const includedPlatforms = filters?.platforms?.filter(p => p.state === "checked").map(p => p.console.toUpperCase())
        const excludedPlatforms = filters?.platforms?.filter(p => p.state === "crossed").map(p => p.console.toUpperCase())

        const platformFilter = baseLibrary.filter(value => {
            const platformNames = value.platforms.map((p) => p.name.toUpperCase())
            const isIncluded = includedPlatforms.some(item => platformNames.includes(item))
            const isExcluded = excludedPlatforms.some(item => platformNames.includes(item))

            if (isIncluded) return true
            if (isExcluded) return false

            return true
        })
        // released filter
        setLibrary(platformFilter)
    }

    useEffect(() => {
        fetchLibraryItems();
    }, [])

    useEffect(() => {
        setLibrary(baseLibrary)
        sortLibraryBy(sortOrder?.type, sortOrder?.order)
    }, [baseLibrary])

    useEffect(() => {
        sortLibraryBy(sortOrder?.type, sortOrder?.order)
    }, [sortOrder])

    // useEffect(() => {
    //     filterLibrary();
    //     sortLibraryBy(sortOrder?.type, sortOrder?.order)
    // }, [filters])


    return { library, fetchLibraryItems, sortLibraryBy };
};

export default useLibrary;

function sortByNameAscending(a: IgdbProduct, b: IgdbProduct) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
}
function sortByNameDescending(a: IgdbProduct, b: IgdbProduct) {
    if (a.name < b.name) return 1
    if (a.name > b.name) return -1
    return 0
}
function sortByReleaseDateAscending(a: IgdbProduct, b: IgdbProduct) {
    const aDate = moment(a.releaseDate * 1000)
    const bDate = moment(b.releaseDate * 1000)

    if (aDate < bDate) return -1
    if (aDate > bDate) return 1
    return 0
}
function sortByReleaseDateDescending(a: IgdbProduct, b: IgdbProduct) {
    const aDate = moment(a.releaseDate * 1000)
    const bDate = moment(b.releaseDate * 1000)

    if (aDate < bDate) return 1
    if (aDate > bDate) return -1
    return 0
}
function sortByPaidPriceAscending(a: IgdbProduct, b: IgdbProduct) {
    if (a.pricePaid < b.pricePaid) return -1
    if (a.pricePaid > b.pricePaid) return 1
    return 0
}
function sortByPaidPriceDescending(a: IgdbProduct, b: IgdbProduct) {
    if (a.pricePaid < b.pricePaid) return 1
    if (a.pricePaid > b.pricePaid) return -1
    return 0
}
function sortByDateAddedAscending(a: IgdbProduct, b: IgdbProduct) {
    const aDate = moment(a.createdAt)
    const bDate = moment(b.createdAt)

    if (aDate < bDate) return -1
    if (aDate > bDate) return 1
    return 0
}
function sortByDateAddedDescending(a: IgdbProduct, b: IgdbProduct) {
    const aDate = moment(a.createdAt)
    const bDate = moment(b.createdAt)

    if (aDate < bDate) return 1
    if (aDate > bDate) return -1
    return 0
}