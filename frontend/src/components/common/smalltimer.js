import React, { useEffect, useContext } from "react";
import Button from "./Button";
import CountdownAnimation from "./CountdownAnimation";
import SetPomodoro from "./SetPomodoro";
import { SettingsContext } from "./SettingsContext";
export const setExactTimeout = function (callback, duration, resolution) {
  const start = new Date().getTime();
  const timeout = setInterval(function () {
    if (new Date().getTime() - start > duration) {
      callback();
      clearInterval(timeout);
    }
  }, resolution);

  return timeout;
};

export const clearExactTimeout = function (timeout) {
  clearInterval(timeout);
};
