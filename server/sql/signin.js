const searchAcc = (phoneNumber) => {
  return `
        SELECT *, nv.id as nv_id 
        FROM nv WHERE nv.phoneNumber = '${phoneNumber}'`;
};

module.exports = { searchAcc };
