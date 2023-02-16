import React from "react"
import { IPCProduct, IProductMetadata } from "interfaces/product";
import { CheerioAPI } from "cheerio";
const cheerio: CheerioAPI = require("cheerio")

const usePriceChartingApi = () => {
    async function query(query: string): Promise<{ products: IPCProduct[] }> {
        const response = await fetch('https://www.pricecharting.com/api/products?t=c0b53bce27c1bdab90b1605249e600dc43dfd1d5&q=' + query)
            .then(res => res.json())
            .catch(e => console.error(e))
        return response;
    }

    async function crawlProduct(product: IPCProduct): Promise<IProductMetadata> {
        const productData = product
        const url = `https://www.pricecharting.com/game/${productData['id']}`

        const response = await fetch(url)
            .then(response => response.text())
            .then(html => cheerio.load(html))
            .then($ => {
                let metadata: IProductMetadata = {
                    name: "",
                    pcid: "",
                    console: "",
                    esrb: "",
                    publisher: "",
                    developer: "",
                    releaseDate: "",
                    identifier: "",
                    variants: [],
                    description: "",
                    coverImageUrl: ""
                }
                // metadata["name"] = productData["product-name"]
                // metadata["pcid"] = productData.id
                // metadata["console"] = productData["console-name"]
                metadata["name"] = getName($)
                metadata["pcid"] = getPcid($)
                metadata["console"] = getConsole($)

                metadata["coverImageUrl"] = getCoverImage($)
                metadata["esrb"] = getEsrb($)
                metadata["publisher"] = getPublisher($)
                metadata["developer"] = getDeveloper($)
                metadata["releaseDate"] = getReleaseDate($)
                metadata["identifier"] = getIdentifier($)
                metadata["variants"] = getVariants($)
                metadata["description"] = getDescription($)

                return metadata
            })
            .catch(error => {
                console.error(error);
            });

        return response as IProductMetadata
    }

    async function queryVariantData(pcidList: string[], properties?: Array<keyof IProductMetadata>): Promise<Partial<IProductMetadata[]> | {}> {

        const urls = pcidList.map((id) => `https://www.pricecharting.com${id}`)
        const responses = urls
            .map(url => fetch(url)
                .then(res => res.text())
                .then(html => cheerio.load(html))
                .then($ => {
                    let data: Partial<IProductMetadata> = {}

                    properties?.forEach(prop => {
                        if (prop == "name") data.name = getName($)
                        else if (prop == "pcid") data.pcid = getPcid($)
                        else if (prop == "console") data.console = getConsole($)
                        else if (prop == "coverImageUrl") data.coverImageUrl = getCoverImage($)
                        else if (prop == "releaseDate") data.releaseDate = getReleaseDate($)
                        else if (prop = "esrb") data.esrb = getEsrb($)
                        else if (prop = "publisher") data.publisher = getPublisher($)
                        else if (prop = "developer") data.developer = getDeveloper($)
                        else if (prop = "releaseDate") data.releaseDate = getReleaseDate($)
                        else if (prop = "identifier") data.identifier = getIdentifier($)
                        else if (prop = "variants") data.variants = getVariants($)
                        else if (prop = "description") data.description = getDescription($)
                    })

                    return data
                })
                .catch(e => console.log(e))
            )

        return Promise.all(responses)
    }

    return { query, crawlProduct, queryVariantData }
}

// replace(/^\s+|\s+$/g, '')
// replace(/^\s+|\s+$|,/g, '')
function getName($: CheerioAPI): string {
    return $("#product_name").first().contents().filter(function () {
        return this.type === 'text';
    }).text().trim()
}
function getPcid($: CheerioAPI): string {
    return $("#product_name").attr("title") as string
}
function getConsole($: CheerioAPI): string {
    return $("#product_name > a").text().trim()
}
function getCoverImage($: CheerioAPI): string {
    return $("div.cover")
        .find('img').attr('src') as string
}
function getEsrb($: CheerioAPI): string {
    return $("div#full_details")
        .find("*[itemprop = 'contentRating']")
        .text().trim()
}
function getPublisher($: CheerioAPI): string {
    return $("div#full_details")
        .find("*[itemprop = 'publisher']")
        .text().trim()
}
function getDeveloper($: CheerioAPI): string {
    return $("div#full_details")
        .find("*[itemprop = 'author']")
        .text().trim()
}
function getReleaseDate($: CheerioAPI): string {
    return $("div#full_details")
        .find("*[itemprop = 'datePublished']")
        .text().trim()
}
function getIdentifier($: CheerioAPI): string {
    return $("div#full_details")
        .find("*[itemprop = 'identifier']")
        .find("td.details").text().trim()
}
function getVariants($: CheerioAPI): string[] {
    return $("div#full_details")
        .find("a.variant").get()
        .map((a) => $(a).attr("href")) as string[]
}
function getDescription($: CheerioAPI): string {
    return $("div#full_details")
        .find("*[itemprop = 'description']")
        .text().trim()
}

export default usePriceChartingApi

