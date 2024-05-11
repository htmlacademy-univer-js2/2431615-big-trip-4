import { DATE_FORMAT_EDIT } from '../const.js';
import { humanizeTaskDueDate } from '../utils.js';
import { BLANC_TEST, destinations } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { Offers, getOffersId } from '../mock/offers.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


const createPicture = (picture) =>
  `
  <img class="event__photo" src="${picture}.jpg" alt="Event photo">
  `;

const createPictures = (photosSrc) => Array.from(photosSrc, createPicture);

const createOptions = (type) =>
  `<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>

    <div class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${'taxi' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${'bus' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${'train' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${'ship' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${'drive' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${'flight' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${'check-in' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${'sightseeing' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
    </div>

    <div class="event__type-item">
      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${'restaurant' === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
    </div>
  </fieldset>
</div>`;

const createDistOpt = (destination) => {
  let res = '';
  destinations.forEach((dest) => {
    res += `<option ${destination === dest ? 'selected' : ''} value="${dest}">${dest}</option>`;
  });
  return res;
};

const createDestinations = (type, destination) =>
  `<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-1">
    ${type}
  </label>

  <select class="event__input  event__input--destination" type="text" selected="${destination} id="destination-list-1">
    ${createDistOpt(destination)}
  
  </select>
</div>`;

const createOfferEdit = (offers) => {
  let res = '';
  offers.forEach((offer) => {
    res += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.name}-1" type="checkbox" name="${offer.name}" ${offer.checked ? 'checked' : ''}>
      <label class="event__offer-label" for="${offer.name}-1">
        <span class="event__offer-title">${offer.text}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.cost}</span>
      </label>
    </div>
    `;
  });
  return res;
};


const createOffersEdit = (offers) =>
  `
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOfferEdit(offers) }
    </div>
  </section>
  `;

const createEditorView = ({type, destination, cost, date, desctiption, photosSrc, activeOffers}) =>
  (
    `
    
    <li><form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
        ${createOptions(type)}
        
      </div>
    
      ${createDestinations(type, destination)}
    
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(date.start, DATE_FORMAT_EDIT)}">
        &mdash;
        <label claыss="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeTaskDueDate(date.end, DATE_FORMAT_EDIT)}">
      </div>
    
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
      </div>
    
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${createOffersEdit(activeOffers)}

    
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${desctiption}</p>
    
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPictures(photosSrc)}
          </div>
        </div>
      </section>
    </section>
    </form>
    </li>


    `
  );
export default class EditorView extends AbstractStatefulView{
  #onSubmit;
  #datepickerFrom;
  #datepickerTo;
  #deletePoint;
  #point;

  constructor({point = BLANC_TEST, onSubmit, deletePoint}) {
    super();
    this._setState(EditorView.parsePointToState(point));

    this.#onSubmit = onSubmit;

    this._restoreHandlers();

    this.#point = point;
    this.#deletePoint = deletePoint;

  }

  get template() {
    return createEditorView(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    else if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #onDateChangeFrom = ([userDate]) => {
    this.updateElement({
      date: {
        start: userDate,
        end: this._state.date.end
      },
    });
  };

  #onDateChangeTo = ([userDate]) => {
    this.updateElement({
      date: {
        start: this._state.date.start,
        end: userDate
      }
    });
  };

  #setDatepickers() {
    const timeInputs = this.element.querySelectorAll('.event__input--time');
    if (this._state.date) {
      this.#datepickerFrom = flatpickr(
        timeInputs[0],
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: '',
          onChange: this.#onDateChangeFrom,
        },
      );
      this.#datepickerTo = flatpickr(
        timeInputs[1],
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: '',
          onChange: this.#onDateChangeTo,
        }
      );
    }
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#onPriceInput);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#onDeleteButtonClick);

    this.element
      .addEventListener('submit', this.#onFormSubmit);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onFormClose);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationChange);

    this.element.querySelector('.event__type-group')
      .addEventListener('input', this.#onTypeChange);

    const checkboxOffers = this.element.querySelectorAll('.event__offer-checkbox');
    checkboxOffers.forEach((checkbox) => {
      checkbox.addEventListener('change', this.#onOffersChange);
    });

    this.#setDatepickers();
  }

  #onOffersChange = (evt) => {
    const offerName = evt.target.name;
    const curOffer = this._state.activeOffers.find((offer) =>
      offer.name === offerName
    );

    if(evt.target.checked){
      curOffer.checked = true;
    }
    else{
      curOffer.checked = false;
    }

    this.updateElement({
      activeOffers: this._state.activeOffers,
    });
  };


  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: {
        id: getOffersId(evt.target.value),
      },
      activeOffers:
        Offers[getOffersId(evt.target.value)],
    });
  };

  reset(point) {
    this.updateElement(
      EditorView.parsePointToState(point),
    );
  }

  #onFormClose = (evt) => {
    evt.preventDefault();
    this.reset(this.#point);
    this.#onSubmit();
  };

  #onDeleteButtonClick = (evt) => {
    evt.preventDefault();
    this.#deletePoint(EditorView.parseStateToPoint(this._state));
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onSubmit(EditorView.parseStateToPoint(this._state));
    this.#onFormClose(evt);
  };

  #onDestinationChange = (evt) => {
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #onPriceInput = (evt) => {
    const regex = /^\d{1,6}$/;
    if (regex.test(evt.target.value)) {
      this.updateElement({
        cost: evt.target.value,
      });
    }
  };

  static parsePointToState(point){
    return {...point};
  }

  static parseStateToPoint(state){
    return {...state};
  }
}
