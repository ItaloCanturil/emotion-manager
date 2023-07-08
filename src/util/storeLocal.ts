import { convertDateBrToYMD } from './util';
import { log } from './log';

export const getData = (
  key: string,
  _default: unknown | Array<unknown> | string | object | number = null
): unknown | Array<unknown> | string | object | number => {
  if (localStorage.length == 0) {
    return _default;
  }

  const row = localStorage.getItem('app_atena_omint:' + key);
  if (row) {
    const data = JSON.parse(row);
    return data.data;
  }

  return _default;
};

export const setData = (
  key: string,
  value: unknown | string | object | number
) => {
  return localStorage.setItem(
    'app_atena_omint:' + key,
    JSON.stringify({ data: value })
  );
};

export const setDataExpire = (
  key: string,
  value: unknown | Array<unknown> | string | object | number,
  minutos = 10
) => {
  const now = new Date();

  return localStorage.setItem(
    'app_atena_omint:' + key,
    JSON.stringify({ data: value, expira: now.getTime() + minutos * 60000 })
  );
};

export const getDataExpire = (
  key: string,
  _default: unknown | Array<unknown> | string | object | number = null
): unknown | Array<unknown> | string | object | number => {
  if (localStorage.length == 0) {
    return _default;
  }

  const row = localStorage.getItem('app_atena_omint:' + key);
  if (row) {
    const data = JSON.parse(row);
    const now = new Date();
    if (now.getTime() > data.expira) {
      localStorage.removeItem('app_atena_omint:' + key);
      return _default;
    }
    return data.data;
  }

  return _default;
};

export const setDataExpireByDate = (
  key: string,
  value: any | Array<any> | string | object | number,
  date: string
) => {
  const now = new Date(); //todays date
  const end = new Date(convertDateBrToYMD(date) + ' 23:59:59'); // another date
  console.log(now, Number(now));
  const duration = Math.abs(Number(now) - Number(end));
  const minutes = Math.floor(duration / 1000 / 60);
  log(`setDataExpireByDate:${key}:${date}:minutes`, { minutes, duration });
  return setDataExpire(key, value, minutes);
};
