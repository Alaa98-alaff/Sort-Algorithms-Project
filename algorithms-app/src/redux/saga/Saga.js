import {
  takeLatest,
  call,
  put,
  takeEvery,
  delay,
  take,
  fork,
} from "redux-saga/effects";

import * as Api from "./Api";
import * as actionTypes from "../actionTypes";

const actionData = function (type, payload) {
  return { type, payload };
};

export default function* () {}
