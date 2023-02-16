import { addColumns, createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: "igdbProducts",
          columns: [
            { name: "igdb_id", type: "number", isIndexed: true },
            { name: "name", type: "string" },
            { name: "platforms", type: "string" },
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
    },
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: "igdbProducts",
          columns: [
            { name: "platform_specific_prices", type: "string", isOptional: true }
          ]
        })
      ]
    }
  ],
})