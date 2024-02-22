import { getRandomArrayElement } from '../utils';
import { pointTypes, destinations } from '../const';


const mockPoints = [
  {
    type: getRandomArrayElement(pointTypes),
    destination: getRandomArrayElement(destinations),
    cost: 120,
    date: {
      start: Date(2024, 8, 20, 18, 30, 10, 0),
      end: Date(2024, 8, 20, 20, 30, 10, 0)
    },
    offers: [
      {
        cost: '100',
        title: 'bebra'
      },
      {
        cost: '12',
        title: 'bebra'
      },
      {
        cost: '52',
        title: 'bebra'
      }
    ],
    desctiption:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    photosSrc: [`https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 20)}`]
  },
  {
    type: getRandomArrayElement(pointTypes),
    destination: getRandomArrayElement(destinations),
    cost: 100,
    date: {
      start: Date(2024, 5, 20, 18, 30, 10, 0),
      end: Date(2024, 6, 20, 20, 30, 10, 0)
    },
    offers: [
      {
        cost: '100',
        title: 'bebra'
      },
      {
        cost: '12',
        title: 'bebra'
      },
      {
        cost: '52',
        title: 'bebra'
      }
    ],
    desctiption:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    photosSrc: [`https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 20)}`]
  },
  {
    type: getRandomArrayElement(pointTypes),
    destination: getRandomArrayElement(destinations),
    cost: 120,
    date: {
      start: Date(2024, 8, 20, 18, 30, 10, 0),
      end: Date(2024, 8, 20, 20, 30, 10, 0)
    },
    offers: [
      {
        cost: '100',
        title: 'bebra'
      },
      {
        cost: '12',
        title: 'bebra'
      },
      {
        cost: '52',
        title: 'bebra'
      }
    ],
    desctiption:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    photosSrc: [`https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 20)}`]
  },
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export {getRandomPoint};
