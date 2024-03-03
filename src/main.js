import Presenter from './presenter/presenter';
import PointsModel from './model/point-model';

const pageBody = document.querySelector('.page-body');
const tripsContainer = pageBody.querySelector('.trip-events');
const headerElement = pageBody.querySelector('.trip-controls');

const points = new PointsModel();

const presenter = new Presenter(
  {
    headerElement: headerElement,
    tripsElement: tripsContainer,
    pointsModel: points
  }
);

presenter.init();
