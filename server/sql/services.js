const searchService = (tendichvu, giadichvu) => {
  let condition = "";

  if (tendichvu) {
    condition += `where dich_vu.tendichvu = '${tendichvu}'`;
  } // chỉ 1 tác vụ trong if thì có thể bỏ block {}
  if (giadichvu) {
    condition += `ORDER BY giadichvu ${giadichvu}`;
  }

  return `
      SELECT * FROM dich_vu ${condition}`;
};

module.exports = { searchService };
