const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
import dayjs from 'dayjs';

const humanizeTaskDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const countDuration = (dateStart, dateEnd) => dayjs(dateEnd).diff(dateStart, 'm');


export{getRandomArrayElement, humanizeTaskDueDate, countDuration};
