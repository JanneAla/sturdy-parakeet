export interface IPCProduct {
    "console-name": string,
    id: string,
    "product-name": string
}

export interface IProductMetadata {
    name: string,
    pcid: string,
    console: string,
    esrb: string,
    publisher: string,
    developer: string,
    releaseDate: string,
    identifier: string,
    description: string,
    variants: string[],
    coverImageUrl: string
}

export interface IFullProductData extends IProductMetadata {
    id: string,
    owned: boolean,
    pricePaid: number,
    releasePrice: number,
    createdAt?: Date,
    updatedAt?: Date
}