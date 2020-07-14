# slim-datepicker [![NPM version](https://img.shields.io/npm/v/slim-datepicker.svg)](https://www.npmjs.com/package/slim-datepicker) [![Downloads](http://img.shields.io/npm/dm/slim-datepicker.svg)](https://npmjs.org/package/slim-datepicker) [![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
Flexible user friendly datepicker with optional calendar.

![slim-datepicker](https://raw.githubusercontent.com/bharatpe/slim-datepicker/master/logo.png)



# Getting Started

```javascript
yarn add slim-datepicker
```

or

```javascript
npm i slim-datepicker
```


## Usage
Basic use:
```javascript
import React, { useState } from 'react'
import SlimDatePicker from 'slim-datepicker';

const App = () => {
  return <SlimDatePicker
  min="5"
  max="30"
  onSubmit={date => {
    console.log("Submitted", date);
  }}
  containerStyle="container-class"/>;
}

// Only calendar
const App2 = () => {
  return <SlimDatePicker
  min="5"
  max="30"
  onlyCalendar
  calenderIconHTML={<h1 style={{"color": "#000"}}>Open Calendar</h1>}
  onSubmit={date => {
    console.log("Submitted", date);
  }}
  containerStyle="container-class"/>;
}

```

  defaultDate: PropTypes.object,
  min: PropTypes.string,
  max: PropTypes.string,
  onSubmit: PropTypes.func,
  calendarIcon: PropTypes.string,
  containerStyle: PropTypes.string,
  onlyCalendar: PropTypes.bool,
  calenderIconHTML: PropTypes.node,

## Options
|  Props                | Description                                                      | Default value
|-----------------------|------------------------------------------------------------------|-------------------------------|
|defaultDate            | Default date                                                     | new Date() // Tue Jul 14 2020 19:11:09 GMT+0530 (India Standard Time)
|min                    | min age (Duration) - Example : 5 (Till 5 years from now), IF (-ve) Ex: -10 then date supports till 2025 (Future date)   | --
|max                    | max age (Duration) - Example : 30 (Upto 30 years earlier)        | --
|onSubmit               | Triggers once date valid & filled / Selected from calendar       | 
|calendarIcon           | Calendar trigger Icon, On click on this calendar modal will open | default icon
|containerStyle         | Styling the date picker container                                | default style
|calenderIconHTML       | Just a text or button click can trigger calendar via this        | --


## PREVIEW

![slim-datepicker](https://raw.githubusercontent.com/bharatpe/slim-datepicker/master/demo/demo-1.png)

![slim-datepicker](https://raw.githubusercontent.com/bharatpe/slim-datepicker/master/demo/demo.png)


# Demo Sandbox
Here [DemoSandbox](https://codesandbox.io/embed/heuristic-cookies-glj46?codemirror=1)

# Releases
Here [Releases](https://github.com/bharatpe/slim-datepicker/blob/master/releases.md)

    
## Note: For Contributors
This repo build with [create-react-library](https://github.com/transitive-bullshit/create-react-library)


## Contributors
Here [Contributors](https://github.com/bharatpe/slim-datepicker/graphs/contributors)


## License
ISC [BharatPe TM](https://engineering.bharatpe.com/)
