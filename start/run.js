import { connect } from "mongoose";
import config from "config";

const port = config.get('port');
const db_url = config.get("DB_URL");

export const run = (app) => {
    try {
        connect(db_url);
    
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
};

