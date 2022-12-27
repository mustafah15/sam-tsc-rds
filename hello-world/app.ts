import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { knex } from 'knex';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const database = knex({
            client: 'mysql2',
            connection: {
                host: 'database-1.coc13ag5l7ap.eu-central-1.rds.amazonaws.com',
                user: 'admin',
                password: 'adminpass',
                database: 'testdb',
            },
        });
        const result = await database.select().table('vals');
        // const database = await mysql.createConnection({
        //     host: 'database-1.coc13ag5l7ap.eu-central-1.rds.amazonaws.com',
        //     user: 'admin',
        //     password: 'adminpass',
        //     database: 'testdb',
        // });

        // const [raws, fields] = await database.execute('SELECT * FROM `vals`');
        return {
            statusCode: 200,
            body: JSON.stringify({ result }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
