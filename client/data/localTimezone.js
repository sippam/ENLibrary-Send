// ========== Local time in timezone TH ==========
const timezone = "Asia/Bangkok";
const getTime = () => {return new Date(new Date().toLocaleString("en-US", { timeZone: timezone }))};
// ===============================================

export { getTime };