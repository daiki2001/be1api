import express from "express";
import config from "./config";
import * as mysql from "promise-mysql";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
 console.log(`Start on port ${config.port}.`);
});

const connection = async () => {
 return await mysql.createConnection(config.db);
};

// faculty一覧取得
app.get("/faculty", (req: express.Request, res: express.Response) => {
  const facultyId = req.params.facultyId;
  connection()
    .then((connection) => {
      const result = connection.query("SELECT * FROM FACULTY");
      connection.end();
      return result;
    })
    .then(function(rows) {
      res.send(rows);
    });
 });
 
// faculty単一取得
app.get("/faculty/:facultyId", (req: express.Request, res: express.Response) => {
 const facultyId = req.params.facultyId;
 connection()
   .then((connection) => {
     const result = connection.query("SELECT * FROM FACULTY WHERE ID = ?", [
       facultyId,
     ]);
     connection.end();
     return result;
   })
   .then(function(rows) {
     res.send(rows);
   });
});
