const searchCustomer = (name, phoneNumber) => {
  let condition = "";
  if (name || phoneNumber) {
    condition += "where ";
    const queryArray = [];
    if (name) queryArray.push(`khach_hang.name = '${name}'`);
    if (phoneNumber)
      queryArray.push(`khach_hang.phoneNumber = '${phoneNumber}'`);
    condition += queryArray.join(" and ");
  }

  return `
        SELECT * , khach_hang.id as khach_hang_id
        FROM khach_hang 
        ${condition}`;
};

const insertCustomer = "INSERT INTO khach_hang SET ?";

const updateCustomer = (name, phoneNumber, id) =>
  `UPDATE khach_hang SET name = '${name}', phoneNumber = '${phoneNumber}' WHERE id = ${id}`;

const deleteCustomer = (id) => `DELETE FROM khach_hang WHERE id = ${id}`;

module.exports = {
  searchCustomer,
  insertCustomer,
  deleteCustomer,
  updateCustomer,
};
