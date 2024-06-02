import { generateRandomString } from '../utils/utils';

const UserActions = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
};

const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


const TimeLimits = {
  LOWER_LIMIT: 300,
  UPPER_LIMIT: 1000,
};


const AUTHORIZATION = `Basic ${generateRandomString(16)}`;

const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

export {AUTHORIZATION, END_POINT, UpdateTypes, UserActions, TimeLimits};
