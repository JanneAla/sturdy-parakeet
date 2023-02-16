import { Model } from '@nozbe/watermelondb'
import { text, field, json, date, readonly, nochange } from '@nozbe/watermelondb/decorators'

export default class Product extends Model {
    static table = "products"

    @text("name") name
    @nochange @text("pcid") pcid
    @text("console") console
    @text("esrb") esrb
    @text("publisher") publisher
    @text("developer") developer
    @text("releaseDate") releaseDate
    @text("identifier") identifier
    @text("description") description
    @json("variants", sanitizer) variants
    @text("coverImageUrl") coverImageUrl
    @field("owned") owned
    @text("pricePaid") pricePaid
    @text("releasePrice") releasePrice
    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt
}

function sanitizer(raw) {
    return raw
}