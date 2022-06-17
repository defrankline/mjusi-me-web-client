import {config} from "./config";

export const environment = {
  production: true,
  api: config.server + '/api/v1',
  page: 0,
  size: 20,
  perPageOptions: [20, 25, 50, 100, 200],
  maxSize: 5
};
