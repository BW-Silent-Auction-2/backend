
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
            .integer("initial-price")
            .notNullable();
        table
            .string("timeSubmit")
            .notNullable();
        table
            .string("timeEnds")
            .notNullable();
       
    })
};

exports.down = function(knex) {
    return knex.schema
                .dropTableIfExists('users')
                .dropTableIfExists('items')
};
