
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './models/schema'
import migrations from './models/migrations'
import Product from './models/Product'
import IgdbProduct from 'models/IgdbProduct'

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
        console.error(`Database setup error: ${error}`)
    }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        Product,
        IgdbProduct
    ],
})

export { database }