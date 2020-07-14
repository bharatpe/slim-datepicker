const numberRegex = /^[-+]?\d*$/;

/**
 * @name formatDate
 * @param {*} date 
 * @returns {Object}
 * @description Date formatting and sending an object of day, month, year
 */
const formatDate = date => {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

/**
 * @name getDateByYearSpan
 * @param {*} val 
 * @returns {Object}
 * @description Calculating date by age/years (value)
 */
const getDateByYearSpan = val => {
  const date = new Date(new Date().setFullYear(new Date().getFullYear() - val));
  return date;
};

/**
 * @name getCurrentDate
 * @returns {Object}
 * @description Sending current date
 */
const getCurrentDate = () => formatDate(new Date());

/**
 * @name getDefaultMinDate
 * @description sending default min date object
 */
const getDefaultMinDate = () => ({ date: 1, month: 1, year: 1 });

/**
 * @name getDateBySpashFormat
 * @param {*} date 
 * @returns {string}
 * @description Converting date to slash format Ex : 18/11/2002 
 */
const getDateBySpashFormat = date => {
  const formatDate = new Date(date);
  return `${formatDate.getDate()}/${formatDate.getMonth()}/${formatDate.getFullYear()}`;
};

/**
 * @name isValidDate
 * @param {*} date 
 * @returns {Boolean}
 * @description Checks for date validity
 */
const isValidDate = date => {
  return new Date(date) instanceof Date && !isNaN(date);
};

/**
 * @name onlyNumber
 * @param {*} val 
 * @returns boolean
 * @description Checks number validity
 */
const onlyNumber = val => {
  if (val.length === 0) return true;
  return numberRegex.test(val);
};

export {
  formatDate,
  getDateByYearSpan,
  getCurrentDate,
  getDefaultMinDate,
  getDateBySpashFormat,
  isValidDate,
  onlyNumber
};
