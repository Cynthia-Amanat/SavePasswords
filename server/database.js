import {createPool} from 'mysql';

const pool = createPool({
    port:3306,
    host:"127.0.0.1",
    user: "root",
    password:"password",
    database:"test",
    connectionLimit:10

}, () => {
    console.log('connect to port ')
})


export default pool;