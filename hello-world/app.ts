import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as mysql from 'mysql2/promise';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const database = await mysql.createConnection({
            host: 'database-1.coc13ag5l7ap.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password: 'adminpass',
            database: 'testdb',
        });

        const [raws, fields] = await database.execute('SELECT * FROM `vals`');
        return {
            statusCode: 200,
            body: JSON.stringify({ raws, fields }),
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
