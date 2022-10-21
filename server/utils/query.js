const queryDB = (sql) =>
  new Promise((resolve, reject) => {
    try {
      dbconnect.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { queryDB };
