import {createPool} from 'mysql';

const pool = createPool({
    port:3306,
    host:"localhost",
    user: "root",
    password:"esther2020",
    database:"test",
    connectionLimit:10

})


export default pool;