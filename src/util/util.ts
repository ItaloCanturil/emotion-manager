export const convertDateBrToYMD = (str: string) => {
  const splitDate = str.split('/');
  if (splitDate.length !== 3) {
    return '';
  }
  return splitDate.reverse().join('-');
};

export const validateMMAA = (mmaa: string) => {
  const [month, year] = mmaa.split('/');
  let currentYear = new Date().getFullYear();
  currentYear = parseInt(currentYear.toString().substring(2));
  const currentMonth = new Date().getMonth() + 1;

  if (Number(month) < currentMonth && Number(year) < currentYear) return false;

  if (Number(year) === currentYear && Number(month) < currentMonth)
    return false;

  return true;
};

export const strToBoolean = (val: string): boolean => {
  const value = String(val);
  const truthy: string[] = ['true', 'True', 'yes', '1'];

  return truthy.includes(value);
};

export function getObjetProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

export const isArrayContainsOneOrMore = <T>(arr: T[], arr2: T[]) => {
  if (arr.length == 0 || arr2.length == 0) {
    return false;
  }
  return (
    arr.find((element) => {
      return arr2.includes(element);
    }) != undefined
  );
};

export const validateEmail = (val: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(val);
};

export const validatePassword = (val: string): boolean => {
  if (val.length < 8) return false;
  // TODO - Add more validations

  return true;
};

export const getURL = () => {
  let url =
    'http://localhost:9000/' ??
    process?.env?.PUBLIC_SITE_URL ??
    process?.env?.PUBLIC_VERCEL_URL;

  url = url.includes('http') ? url : `https://${url}`;

  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};
