import Calendar from "./Calendar";

const pjson = require("../package.json");
console.log(
  ` >> 🗺🗺🗺 React Slim Calendar : Version: ${pjson.version}, Build: ${process.env.NODE_ENV} <<`
);

export default Calendar;