import Presenter from './presentor/presenter';

const pageBody = document.querySelector('.page-body');
const control = pageBody.querySelector('.trip-controls');
const tripsContainer = pageBody.querySelector('.trip-events');

const presenter = new Presenter({
  header: pageBody.querySelector('.trip-controls'),
  trips: tripsContainer,
  control: control,
});

presenter.init();
