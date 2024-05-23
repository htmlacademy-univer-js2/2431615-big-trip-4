import { remove, render, replace } from '../framework/render';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter{
  #tripInfoComponent;

  #offersModel;
  #destinationsModel;
  #pointsModel;

  #tripMain;
  constructor({tripMain, pointsModel, offersModel, destinationsModel}){
    this.#tripMain = tripMain;


    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.init();
  }


  init(){
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      pointsModel: this.#pointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel
    });

    if (!prevTripInfoComponent) {

      render(this.#tripInfoComponent, this.#tripMain);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

  }


  #handleModelEvent = () => {
    this.init();
  };
}
