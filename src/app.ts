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

app.get("/", (req, res) => {
  res.send('Hello World!');
});

// faculty一覧取得
app.get("/faculty", (req: express.Request, res: express.Response) => {
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

// faculty追加処理
app.post("/faculty", (req: express.Request, res: express.Response) => {
  const name = req.body.name;
  connection()
    .then((connection) => {
      const result = connection.query("INSERT INTO FACULTY (NAME) VALUES (?)", [
        name,
      ]);
      connection.end();
      return result;
    })
    .then(function(rows) {
      res.send(rows);
    });
});

// faculty更新処理
app.patch("/faculty/:facultyId", (req: express.Request, res: express.Response) => {
  const facultyId = req.params.facultyId;
  const name = req.body.name;
  connection()
    .then((connection) => {
      const result = connection.query("UPDATE FACULTY SET NAME = ? WHERE ID = ?", [
        name,
        facultyId,
      ]);
      connection.end();
      return result;
    })
    .then(function(rows) {
      res.send(rows);
    });
});

// faculty削除処理
app.delete("/faculty/:facultyId", (req: express.Request, res: express.Response) => {
  const facultyId = req.params.facultyId;
  connection()
    .then((connection) => {
      const result = connection.query("DELETE FROM FACULTY WHERE ID = ?", [
        facultyId,
      ]);
      connection.end();
      return result;
    })
    .then(function(rows) {
      res.send(rows);
    });
});
