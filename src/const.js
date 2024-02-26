const pointTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const destinations = [
  'Ulan-Ude',
  'Amsterdam',
  'Prague',
  'Luxembourg',
];

const BLANC_TEST =
{
  type: null,
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: {
    id: 0
  },
  desctiption:'',
  photosSrc: []
};

const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';
const DATE_FORMAT_POINT_DAY = 'MMM DD';
const DATE_FORMAT_POINT_HOURS = 'hh-mm';


export {destinations, pointTypes, DATE_FORMAT_EDIT, DATE_FORMAT_POINT_DAY, DATE_FORMAT_POINT_HOURS, BLANC_TEST};
