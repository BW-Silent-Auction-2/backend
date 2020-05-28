
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.increments("id");
        table
            .string("username")
            .unique()
            .notNullable();
        table
            .string("password")
            .notNullable();
        table
            .string("email")
            .unique()
            .notNullable();
        table
            .string("firstName")
            .notNullable();
        table
            .string("lastName")
            .notNullable();
        table
            .integer("userType")
            .notNullable();
    })
    .createTable('items', (table) => {
        table.increments("id");
        table
            .string("title")
            .notNullable();
        table
            .string("description")
            .notNullable();
        table
            .integer("bid")
            .notNullable(); 
        table
            .integer("initialPrice")
            .notNullable();
        table
            .string("timeSubmitted")
            .notNullable();
        table
            .string("timeEnd")
            .notNullable();
        table
            .string("timeDuration");
        table
            .integer("timeDurationInMs");
        table
            .integer("sellerId")
            .notNullable();
        table 
            .integer("bidderId");
        table
            .boolean("completed")
            .defaultTo(false);
        table
            .string("imgUrl")       
    })
};

exports.down = function(knex) {
    return knex.schema
                .dropTableIfExists('users')
                .dropTableIfExists('items')
};
