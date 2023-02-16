export type Platform = {
    id: number
    name: string
}
export type PlatformPrices = {
    [key: number]: {
        release: number,
        paid: number
    }
}
export type Cover = {
    id: number
    url: string
}
export type Genre = {
    id: number
    name: string
}
export type MetaGame = {
    id: number
    name: string
    cover: Cover
    platforms: Platform[]
}
export type Company = {
    id: number
    company: {
        id: number
        name: string
    },
    developer: boolean
    publisher: boolean
}
export type IgdpProduct = {
    id: string,
    igdbId: number
    name: string
    platforms: Platform[]
    platformSpecificPrices: PlatformPrices
    cover: string
    releaseDate: string
    genres: Genre[]
    remakes: MetaGame[]
    remasters: MetaGame[]
    summary: string
    publishers: Company[]
    developers: Company[]
    owned: boolean
    pricePaid: number
    releasePrice: number
    createdAt?: Date,
    updatedAt?: Date
}
export type RawIgdpProduct = {
    id: number
    name: string
    platforms: Platform[]
    cover: Cover
    first_release_date: string
    genres: Genre[]
    remakes: MetaGame[]
    remasters: MetaGame[]
    summary: string
    involved_companies: Company[]
}

// fields 
// name,
// platforms.name,
// cover.url,
// first_release_date,
// genres.name,
// remakes.name, remakes.platforms.name, remakes.cover.url,
// remasters.name, remasters.platforms, remasters.cover,
// involved_companies.company.name,involved_companies.developer, involved_companies.publisher,
// summary;
// where id = 427;