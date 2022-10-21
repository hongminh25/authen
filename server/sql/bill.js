const searchBill = (
  trangthaidonID,
  khachhangID,
  ngaythanhtoan,
  ngaynhanhang
) => {
  let condition = "";
  if (trangthaidonID || khachhangID || ngaythanhtoan || ngaynhanhang) {
    condition += "where ";
    const queryArray = [];
    if (trangthaidonID)
      queryArray.push(`trang_thai_don.id = ${trangthaidonID}`);
    if (khachhangID) queryArray.push(`khach_hang.id = ${khachhangID}`);
    if (ngaythanhtoan)
      queryArray.push(`hoa_don.ngaythanhtoan = ${ngaythanhtoan}`);
    if (ngaynhanhang) queryArray.push(`hoa_don.ngaynhanhang = ${ngaynhanhang}`);

    condition += queryArray.join(" and ");
  }

  return `
      SELECT *, hoa_don.id as hoa_don_id, khach_hang.name as khach_hang_name
      FROM hoa_don
      INNER JOIN trang_thai_don
      ON hoa_don.trangthaidonID = trang_thai_don.id
      INNER JOIN khach_hang
      ON hoa_don.khachhangID = khach_hang.id 
      ${condition}`;
};

const searchBillDetail = (id) =>
  `SELECT * 
  FROM hoa_don_chi_tiet
  INNER JOIN dich_vu
  ON hoa_don_chi_tiet.dichvuID = dich_vu.id WHERE hoadonID = ${id}`;

const insertBill = "INSERT INTO hoa_don SET ?";

const insertBillDetail = "INSERT INTO hoa_don_chi_tiet SET ?";

const updateBill = (
  trangthaidonID,
  khachhangID,
  ngaythanhtoan,
  ngaynhanhang,
  ngaytrahang,
  checkDelete,
  id
) => {
  let xacNhanXoa = "";
  if (checkDelete) {
    xacNhanXoa = `, xacNhanXoa = ${checkDelete}`;
  }
  return `UPDATE hoa_don SET trangthaidonID = '${trangthaidonID}', khachhangID = '${khachhangID}', ngaythanhtoan = '${ngaythanhtoan}', ngaynhanhang = '${ngaynhanhang}', ngaytrahang = '${ngaytrahang}'${xacNhanXoa} WHERE id = ${id}`;
};

const deleteBill = (id) => `DELETE FROM hoa_don WHERE id = ${id}`;

module.exports = {
  searchBill,
  insertBill,
  updateBill,
  deleteBill,
  insertBillDetail,
  searchBillDetail,
};
