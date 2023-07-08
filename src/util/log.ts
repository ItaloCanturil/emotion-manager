/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

export const isLogEnabled = () => {
  return process.env.NODE_ENV !== 'production';
};

export const log = (text: any, data: any = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `%c[log][${
        process.env.NODE_ENV
      }]%c[${new Date().toLocaleString()}] %c ${text} ${JSON.stringify(
        data,
        null,
        4
      )}`,
      'background-color: #2196f3 ; color: #ffffff ; font-weight: bold ; padding: 4px ;',
      'color:orange',
      'color:#000'
    );
  }
};

export const logError = (text: any, infos: any = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      `[ERROR][${
        process.env.NODE_ENV
      }][${new Date().toLocaleString()}] ${JSON.stringify(text)}`,
      infos
    );
  }
};
