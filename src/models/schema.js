import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 3,
    tables: [
        tableSchema({
            name: "products",
            columns: [
                { name: "name", type: "string", isIndexed: true },
                { name: "pcid", type: "string" },
                { name: "console", type: "string" },
                { name: "esrb", type: "string" },
                { name: "publisher", type: "string" },
                { name: "developer", type: "string" },
                { name: "releaseDate", type: "string" },
                { name: "identifier", type: "string" },
                { name: "description", type: "string" },
                { name: "variants", type: "string" },
                { name: "coverImageUrl", type: "string" },
                { name: "owned", type: "boolean" },
                { name: "pricePaid", type: "number" },
                { name: "releasePrice", type: "number" },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: "igdbProducts",
            columns: [
                { name: "igdb_id", type: "number", isIndexed: true },
                { name: "name", type: "string" },
                { name: "platforms", type: "string" },
                { name: "platform_specific_prices", type: "string" },
                { name: "cover", type: "string" },
                { name: "release_date", type: "string" },
                { name: "genres", type: "string" },
                { name: "remakes", type: "string" },
                { name: "remasters", type: "string" },
                { name: "summary", type: "string" },
                { name: "publishers", type: "string" },
                { name: "developers", type: "string" },
                { name: "owned", type: "boolean" },
                { name: "price_paid", type: "number" },
                { name: "release_price", type: "number" },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        })
    ]
})

/*
fields 
name,
platforms.name,
cover.url,
first_release_date,
genres.name,
remakes.name, remakes.platforms, remakes.cover,
remasters.name, remasters.platforms, remasters.cover,
involved_companies.company.name,involved_companies.developer, involved_companies.publisher,
summary;
*/