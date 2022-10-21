const searchNV = (name, phoneNumber, trangthaiID) => {
  let condition = "";
  if (name || phoneNumber || trangthaiID) {
    condition += "where ";
    const queryArray = [];
    if (name) queryArray.push(`nv.name = '${name}'`);
    if (phoneNumber) queryArray.push(`nv.phoneNumber = '${phoneNumber}'`);
    if (trangthaiID) queryArray.push(`trangthai.id = ${trangthaiID}`);
    condition += queryArray.join(" and ");
  }

  return `
    SELECT *, nv.id as nv_id
    FROM nv
    INNER JOIN trangthai
    ON nv.trangthaiID = trangthai.id ${condition}`;
};

const insertNV = "INSERT INTO nv SET ?";

const updateNV = (name, phoneNumber, trangthaiID, id) =>
  `UPDATE nv SET name = '${name}', phoneNumber = '${phoneNumber}', trangthaiID = '${trangthaiID}' WHERE id = ${id}`;

const deleteNV = (id) => `DELETE FROM nv WHERE id = ${id}`;

module.exports = { searchNV, insertNV, updateNV, deleteNV };
