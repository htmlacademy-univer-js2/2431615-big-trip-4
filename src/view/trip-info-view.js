import { DATE_FORMAT_POINT_DAY } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate } from '../utils.js';

function createInfoTemplate({totalCount, destinations, isThree, dateStart, dateEnd}) {
  return (
    `
    <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
        <h1 class="trip-info__title">${destinations[0]} &mdash; ${isThree ? destinations[1] : '...'} &mdash; ${destinations[isThree ? 2 : 1]}</h1>

        <p class="trip-info__dates">${humanizeTaskDueDate(dateStart, DATE_FORMAT_POINT_DAY)}&nbsp;&mdash;&nbsp;${humanizeTaskDueDate(dateEnd, DATE_FORMAT_POINT_DAY)}</p>
        </div>

        <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCount}</span>
        </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #pointsModel;
  #destinations;
  #offers;

  constructor({pointsModel, offersModel, destinationsModel}){
    super();

    this.#destinations = destinationsModel.destinations;
    this.#pointsModel = pointsModel;
    this.#offers = offersModel.offers;
  }

  #countOffersCost = (curOffers, activeOffers) =>{
    let totalCount = 0;
    curOffers.forEach((offer) => {
      if(activeOffers.some((activeOffer) => offer.id === activeOffer)){
        totalCount += offer.price;
      }
    });

    return totalCount;
  };

  getTotalCost(points) {
    let totalCount = 0;

    points.forEach((point) => {
      const currentTypeOffers = this.#offers[point.type];
      totalCount += point.cost + this.#countOffersCost(currentTypeOffers, point.offers);
    });
    return totalCount;
  }

  #prepareData = (points) => {
    const destinations = [];

    switch(points.length){
      case 3:
        points.forEach((point) => {
          destinations.unshift(this.#destinations.find(({id}) => point.destination === id).name);
        });
        return{totalCount: this.getTotalCost(points), destinations: destinations, isThree: true, dateStart: points[0].date.start, dateEnd: points[2].date.end};
      default:
        if(points.length < 3){
          return;
        }

    }

    destinations.unshift(this.#destinations.find(({id}) => points[0].destination === id).name);
    destinations.unshift(this.#destinations.find(({id}) => points[points.length - 1].destination === id).name);


    const totalCount = this.getTotalCost(points);

    return {totalCount, destinations, isThree: false, dateStart: points[points.length - 1].date.start, dateEnd: points[0].date.end};

  };

  get template() {


    const data = this.#prepareData(this.#pointsModel.points);
    return data ? createInfoTemplate(data) : '<div></div>';
  }


}
