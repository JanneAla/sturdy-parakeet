import React from "react"
import { IPCProduct, IProductMetadata } from "interfaces/product";
const cheerio = require("cheerio")

const priceChartingApi = {
    query: (query: string): Promise<{products: IPCProduct[]}> => {
        return fetch('https://www.pricecharting.com/api/products?t=c0b53bce27c1bdab90b1605249e600dc43dfd1d5&q=' + query)
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
    },

    crawlProduct: (product: IPCProduct): Promise<IProductMetadata | void> => {
        const productData = product
        const url = `https://www.pricecharting.com/game/${productData['id']}`

        return fetch(url)
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
                metadata["name"] = productData["product-name"]
                metadata["pcid"] = productData.id
                metadata["console"] = productData["console-name"]

                metadata["coverImageUrl"] = $("div.cover")
                    .find('img').attr('src')
                metadata["esrb"] = $("div#full_details")
                    .find("*[itemprop = 'contentRating']")
                    .text().replace(/^\s+|\s+$/g, '')
                metadata["publisher"] = $("div#full_details")
                    .find("*[itemprop = 'publisher']")
                    .text().replace(/^\s+|\s+$/g, '')
                metadata["developer"] = $("div#full_details")
                    .find("*[itemprop = 'author']")
                    .text().replace(/^\s+|\s+$/g, '')
                metadata["releaseDate"] = $("div#full_details")
                    .find("*[itemprop = 'datePublished']")
                    .text().replace(/^\s+|\s+$|,/g, '')
                metadata["identifier"] = $("div#full_details")
                    .find("*[itemprop = 'identifier']")
                    .find("td.details").text().replace(/^\s+|\s+$/g, '')
                metadata["variants"] = $("div#full_details")
                    .find("a.variant").get().map((a: HTMLAnchorElement) => $(a).attr("href"))
                metadata["description"] = $("div#full_details")
                    .find("*[itemprop = 'description']")
                    .text().replace(/^\s+|\s+$/g, '')

                return metadata
            })
            .catch(error => {
                console.error(error);
            });
    },

    queryVariantCovers: (pcidList: string[]): Promise<string[]> => {

        const urls = pcidList.map((id) => `https://www.pricecharting.com${id}`)
        const responses = urls
            .map(url => fetch(url)
                .then(res => res.text())
                .then(html => cheerio.load(html))
                .then($ => {
                    let url = $("div.cover").find('img').attr('src')
                    return url
                })
                .catch(e => console.log(e))
            )

        return Promise.all(responses)
    }
}

export const PriceChartingContext = React.createContext(priceChartingApi)

export default function PriceChartingApiProvider({ children }: { children: React.ReactNode }) {
    return (
        <PriceChartingContext.Provider value={priceChartingApi}>
            {children}
        </PriceChartingContext.Provider>
    )
}

