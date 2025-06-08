import mysql from "mysql2";
function mysqlConnection() {
  const mysqlQuery = mysql.createConnection(process.env.MYSQL_URI);
  mysqlQuery.connect((err) => {
    if (err) {
      console.log(
        `Facing some problem while connection to the database ${err})`
      );
    } else {
      console.log("MY DataBase connected Seccessfully");
    }
  });
  return mysqlQuery;
}
export default mysqlConnection;
