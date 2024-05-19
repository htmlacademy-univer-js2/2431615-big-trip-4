import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const humanizeTaskDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const countDuration = (dateStart, dateEnd) => {

  dayjs.extend(duration);
  const diff = dayjs.duration(dayjs(dateEnd).diff(dateStart));

  if (diff.asHours() < 1) {
    return `${diff.minutes()}M`;
  } else if (diff.asDays() < 1) {
    return `${diff.hours()}H ${diff.minutes()}M`;
  } else {
    return `${diff.days()}D ${diff.hours()}H ${diff.minutes()}M`;
  }
};


const getRandomInt = (maxNumber) => Math.floor(Math.random() * maxNumber);

const getRandomArrayElement = (items) => items[getRandomInt(items.length)];

const updateItem = (items, update) => {
  const updatedItems = items.map((item) => (item.id === update.id ? update : item));
  return updatedItems;
};

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

const sortByTime = (point1, point2) => {
  const diff1 = dayjs.duration(dayjs(point1.dateEnd).diff(point1.dateStart));
  const diff2 = dayjs.duration(dayjs(point2.dateEnd).diff(point2.dateStart));


  return getWeightForNullDate(point1.date.start, point2.date.start) ?? diff2 - diff1;
};

const sortByPrice = (point1, point2) =>
  point2.cost - point1.cost;

const sortByDefault = (point1, point2) => {

  const weight = getWeightForNullDate(point1.date.start, point2.date.start);

  return weight ?? dayjs(point2.date.start).diff(dayjs(point1.date.start));

};

const isPointPresent = (point) => {
  const now = dayjs();
  return (
    dayjs(point.date.start).isSame(now) ||
    (dayjs(point.date.start).isBefore(now) && dayjs(point.date.end).isAfter(now))
  );
};

const filter = {
  'everything': (data) => [...data],
  'future': (data) => data.filter((point) => dayjs(point.date.start).isAfter(dayjs())),
  'present': (data) => data.filter(isPointPresent),
  'past': (data) => data.filter((point) => dayjs(point.date.end).isBefore(dayjs())),
};

const isEscKey = (key) => key === 'Escape';


export{isEscKey, filter ,sortByDefault, sortByPrice, sortByTime, getRandomArrayElement, humanizeTaskDueDate, countDuration, getRandomInt, updateItem};
