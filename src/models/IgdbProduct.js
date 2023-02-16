import { Model } from '@nozbe/watermelondb'
import { text, field, json, date, readonly, nochange } from '@nozbe/watermelondb/decorators'

export default class IgdbProduct extends Model {
    static table = "igdbProducts"

    @field("igdb_id") igdbId
    @text("name") name
    @text("summary") summary
    @text("cover") cover
    @field("release_date") releaseDate
    @field("owned") owned
    @field("price_paid") pricePaid
    @field("release_price") releasePrice
    @json("platforms", sanitizer) platforms
    @json("platform_specific_prices", sanitizer) platformSpecificPrices
    @json("genres", sanitizer) genres
    @json("remakes", sanitizer) remakes
    @json("remasters", sanitizer) remasters
    @json("publishers", sanitizer) publishers
    @json("developers", sanitizer) developers
    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt
}

function sanitizer(raw) {
    return raw
}