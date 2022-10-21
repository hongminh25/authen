const searchService = (tendichvu, giadichvu) => {
  let condition = "";

  if (tendichvu) {
    condition += `where dich_vu.tendichvu = '${tendichvu}'`;
  }
  if (giadichvu) {
    condition += `ORDER BY giadichvu ${giadichvu}`;
  }

  return `
      SELECT * FROM dich_vu ${condition}`;
};

module.exports = { searchService };
