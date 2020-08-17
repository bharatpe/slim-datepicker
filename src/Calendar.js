import React, { useState, useRef, useEffect } from "react";
import {
  formatDate,
  getDateByYearSpan,
  getCurrentDate,
  getDefaultMinDate,
  isValidDate,
  getDateBySpashFormat,
  onlyNumber,
} from "./utils";
import PropTypes from "prop-types";
import CalendarPopup from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.scss";

import calendarIconLocal from "./assets/calendar.png";

const Calendar = ({
  defaultDate,
  min,
  max,
  onSubmit,
  containerStyle,
  calendarIcon,
  onlyCalendar,
  calenderIconHTML,
}) => {
  const [day, setDay] = useState("");
  const [month, setMonthFinal] = useState("");
  const [year, setYear] = useState("");
  const [calendar, setCalendar] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const [minDate, setMinDate] = useState(getDefaultMinDate());
  const [maxDate, setMaxDate] = useState(getCurrentDate());

  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  /**
   * @name setMonth
   * @description Month is default 0-11 so adding 1 to it before setting state
   * @param {*} month 
   */
  const setMonth = month => {
    setMonthFinal(Number(month)+1)
  }

  /**
   * @name isValidYear
   * @param {*} val
   * @returns {Boolean}
   * @description Checks year validation
   */
  const isValidYear = (val) =>
    Number(val) >= minDate.year && Number(val) <= maxDate.year;

  /**
   * @name isValidDateFormat
   * @returns {Boolean}
   * @description Checks the date validity
   */
  const isValidDateFormat = () => {
    if (min || max) return true;
    if (day === "" && month === "" && year === "") return true;
    const localDay = Number(day);
    const localMonth = Number(month);

    if (localDay <= 0 || localDay > 31) {
      return false;
    }

    if (localMonth <= 0 || localMonth > 12) {
      return false;
    }

    if (!isValidYear(year)) {
      return false;
    }

    return true;
  };

  /**
   * @name setDate
   * @description Sets the date value
   */
  const setDate = (date) => {
    if (isValidDate(date)) {
      date = getDateBySpashFormat(date);
    }
    const array = date?.split("/");
    if (array.length === 3) {
      setDay(array[0]);
      setMonth(array[1]);
      setYear(array[2]);
    }
  };

  /**
   * @name handleKeyDown
   * @param {*} e
   * @param {*} val
   * @param {*} ref
   * @description Handling key down module
   */
  const handleKeyDown = (e, val, ref) => {
    if (e.keyCode === 8) {
      if (val === "") {
        ref.current.focus();
      }
    }
  };

  /**
   * @name setValueAndFocus
   * @param {*} cond
   * @param {*} val
   * @param {*} setVal
   * @param {*} ref
   * @param {*} nextSetVal
   * @param {*} addZeroCondition
   */
  const setValueAndFocus = (
    cond,
    val,
    setVal,
    ref,
    nextSetVal,
    addZeroCondition
  ) => {
    if (cond) {
      setVal(val);
    }
    ref.current.focus();
    if (nextSetVal && val.length > 2) {
      let valSet = val[val.length - 1];
      if (valSet > 0) {
        if (addZeroCondition && valSet < 10 && valSet > 0) {
          valSet = `0${valSet}`;
        }
        nextSetVal(valSet);
      }
    }
  };

  /**
   * @name inputChangeday
   * @param {*} e
   * @description Day input handler
   */
  const inputChangeday = (e) => {
    let { value } = e.target;
    if (!onlyNumber(value)) return;
    const { length } = value;
    if (length > 1) {
      if (value > 31) {
        value = 31;
      }
      setValueAndFocus(length <= 2, value, setDay, monthRef, setMonth, true);
      return;
    }
    if (length === 1) {
      if (value > 3) {
        setValueAndFocus(true, 0 + value, setDay, monthRef);
        return;
      }
    }
    setDay(value);
  };

  /**
   * @name inputChangeMonth
   * @param {*} e
   * @description Month input handler
   */
  const inputChangeMonth = (e) => {
    let { value } = e.target;
    if (!onlyNumber(value)) return;

    const { length } = value;
    if (length > 1) {
      if (value > 12) {
        value = 12;
      }
      setValueAndFocus(month.length < 2, value, setMonth, yearRef, setYear);
      return;
    }
    if (length === 1) {
      if (value > 2) {
        setValueAndFocus(true, 0 + value, setMonth, yearRef);
        return;
      }
    }
    setMonth(value);
  };

  /**
   * @name inputChangeYear
   * @param {*} e
   * @description Year input handler
   */

  const inputChangeYear = (e) => {
    const { value } = e.target;
    if (!onlyNumber(value)) return;

    const { length } = value;
    if (length > 4) return;
    if (length === 4) {
      if (!isValidYear(value)) {
        let yearReset = minDate.year;
        if (Math.abs(value - minDate.year) > Math.abs(value - maxDate.year)) {
          yearReset = maxDate.year;
        }
        setYear(yearReset);
        return;
      }
    }
    setYear(value);
  };

  /**
   * @name calendarUpdate
   * @param {*} val
   * @description Setting calender popup value
   */
  const calendarUpdate = (val) => {
    setCalendar(val);
    const cal = new Date(val);
    setDay(cal.getDate());
    setMonth(cal.getMonth());
    setYear(cal.getFullYear());
    setShowCalendarModal(false);
  };

  /**
   * @name onDateFocus
   * @param {*} val
   * @description Closing modal on date focus
   */
  const onDateFocus = () => {
    setShowCalendarModal(false);
  };

  useEffect(() => {
    if (defaultDate) {
      let date = defaultDate;
      setDate(date);
    }
  }, [defaultDate]);

  useEffect(() => {
    if (min && onlyNumber(min)) {
      const date = getDateByYearSpan(min);
      setMaxDate(formatDate(date));
      setDate(date);
    }
  }, [min]);

  useEffect(() => {
    if (max && onlyNumber(max)) {
      setMinDate(formatDate(getDateByYearSpan(max)));
    }
  }, [max]);

  useEffect(() => {
    if (day && month && year) {
      const date = new Date(year + "-" + month + "-" + day);
      if (isValidDate(date) && date !== calendar) {
        setCalendar(date);
        onSubmit(date);
      }
    }
  }, [day, month, year]);

  let calendarModal = (
    <div className="calendar-modal modalAnim">
      <CalendarPopup
        onChange={calendarUpdate}
        value={calendar}
        maxDate={getDateByYearSpan(min || 0)}
        minDate={getDateByYearSpan(max || 1000)}
      />
    </div>
  );

  let dateClass = "date";

  if (onlyCalendar) {
    dateClass += " only-calendar";
  }

  if (!isValidDateFormat()) {
    dateClass += " date-error";
  }

  if (!showCalendarModal) {
    calendarModal = null;
  }

  return (
    <div className={`App ${containerStyle}`}>
      <div className={dateClass}>
        <label>Date</label>
        <input
          type="text"
          ref={dayRef}
          value={day}
          placeholder="DD"
          onChange={inputChangeday}
          onFocus={onDateFocus}
        />
        <span className="slash">/</span>
        <input
          type="text"
          ref={monthRef}
          value={month}
          placeholder="MM"
          onKeyDown={(e) => handleKeyDown(e, month, dayRef)}
          onChange={inputChangeMonth}
          onFocus={onDateFocus}
        />
        <span className="slash">/</span>
        <input
          type="text"
          ref={yearRef}
          className="year"
          value={year}
          placeholder="YYYY"
          onKeyDown={(e) => handleKeyDown(e, year, monthRef)}
          onChange={inputChangeYear}
          onFocus={onDateFocus}
        />
        <div
          className="calendar-modal-trigger"
          onClick={() => {
            setShowCalendarModal(!showCalendarModal);
          }}
        >

          {calenderIconHTML || <img src={calendarIcon} className="calendar-icon" />}
        </div>
      </div>
      {calendarModal}
    </div>
  );
};

Calendar.propTypes = {
  defaultDate: PropTypes.object,
  min: PropTypes.string,
  max: PropTypes.string,
  onSubmit: PropTypes.func,
  calendarIcon: PropTypes.string,
  containerStyle: PropTypes.string,
  onlyCalendar: PropTypes.bool,
  calenderIconHTML: PropTypes.node,
};

Calendar.defaultProps = {
  defaultDate: new Date(),
  onSubmit: () => {},
  calendarIcon: calendarIconLocal,
  containerStyle: "",
  onlyCalendar: false,
  calenderIconHTML: null,
};

export default Calendar;
