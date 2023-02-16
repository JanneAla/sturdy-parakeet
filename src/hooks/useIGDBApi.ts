import React, { useContext, useEffect } from "react"
import { IProductMetadata } from "interfaces/product";
import axios from "axios";
import { IgdbApiContext } from "contexts/IGDBAuth";
import { RawIgdpProduct } from "interfaces/IgdbProduct";
const secrets = require('../../secrets.json');


// käytä apicalypsea
// https://api-docs.igdb.com/?javascript#authentication
function useIGDBApi() {

    async function queryByName(token: string, name: string): Promise<Partial<RawIgdpProduct[]>> {
        const rawQueryString = `
        fields name, platforms.name;
        where name ~ *"${name}"* & parent_game = null;
        limit 50;
        `

        return axios.post("https://api.igdb.com/v4/games/", rawQueryString, {
            headers: {
                "Client-ID": secrets.ClientId,
                "Authorization": `Bearer ${token}`,
            },
        }).then(
            (res) => res.data,
            (err) => console.error(err))
    }

    async function queryById(token: string, id: number): Promise<Partial<RawIgdpProduct>> {
        const rawQueryString =
            `fields 
            name,
            platforms.name,
            cover.url,
            first_release_date,
            genres.name,
            remakes.name, remakes.platforms.name, remakes.cover.url,
            remasters.name, remasters.platforms, remasters.cover,
            involved_companies.company.name,involved_companies.developer, involved_companies.publisher,
            summary;
            where id = ${id};`

        return axios.post("https://api.igdb.com/v4/games/", rawQueryString, {
            headers: {
                "Client-ID": secrets.ClientId,
                "Authorization": `Bearer ${token}`,
            },
        }).then(res => res.data[0])
    }
    return { queryByName, queryById }
}

export default useIGDBApi