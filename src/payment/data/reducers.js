import { combineReducers } from 'redux';

import {
  BASKET_DATA_RECEIVED,
  BASKET_PROCESSING,
  CAPTURE_KEY_DATA_RECEIVED,
  CAPTURE_KEY_PROCESSING,
  CLIENT_SECRET_DATA_RECEIVED,
  CLIENT_SECRET_PROCESSING,
  MICROFORM_STATUS,
  PAYMENT_STATUS_DATA_RECEIVED,
  fetchBasket,
  submitPayment,
  fetchCaptureKey,
  fetchClientSecret,
  updatePaymentStatus,
} from './actions';

import { DEFAULT_STATUS } from '../checkout/payment-form/flex-microform/constants';
import { PAYMENT_STATE } from './constants';

const basketInitialState = {
  loading: true,
  loaded: false,
  submitting: false,
  redirect: false,
  isBasketProcessing: false,
  products: [],
};

const basket = (state = basketInitialState, action = null) => {
  if (action !== null) {
    switch (action.type) {
      case fetchBasket.TRIGGER: return { ...state, loading: true };
      case fetchBasket.FULFILL: return {
        ...state,
        loading: false,
        loaded: true,
      };

      case BASKET_DATA_RECEIVED: return { ...state, ...action.payload };

      case BASKET_PROCESSING: return {
        ...state,
        isBasketProcessing: action.payload,
      };

      case submitPayment.TRIGGER: return {
        ...state,
        paymentMethod: action.payload.method,
      };
      case submitPayment.REQUEST: return {
        ...state,
        submitting: true,
      };
      case submitPayment.SUCCESS: return {
        ...state,
        redirect: true,
      };
      case submitPayment.FULFILL: return {
        ...state,
        submitting: false,
        paymentMethod: undefined,
      };

      default:
    }
  }
  return state;
};

const captureContextInitialState = {
  isCaptureKeyProcessing: false,
  microformStatus: DEFAULT_STATUS,
  captureKeyId: '',
};

const captureKey = (state = captureContextInitialState, action = null) => {
  if (action !== null) {
    switch (action.type) {
      case fetchCaptureKey.TRIGGER: return state;
      case fetchCaptureKey.FULFILL: return state;

      case CAPTURE_KEY_DATA_RECEIVED: return { ...state, ...action.payload };

      case CAPTURE_KEY_PROCESSING: return {
        ...state,
        isCaptureKeyProcessing: action.payload,
      };

      case MICROFORM_STATUS: return {
        ...state,
        microformStatus: action.payload,
      };

      default:
    }
  }
  return state;
};

const clientSecretInitialState = {
  isClientSecretProcessing: false,
  clientSecretId: '',
};

const clientSecret = (state = clientSecretInitialState, action = null) => {
  if (action != null) {
    switch (action.type) {
      case fetchClientSecret.TRIGGER: return state;
      case fetchClientSecret.FULFILL: return state;
      case CLIENT_SECRET_DATA_RECEIVED: return { ...state, ...action.payload };
      case CLIENT_SECRET_PROCESSING: return { ...state, isClientSecretProcessing: action.payload };

      default:
    }
  }
  return state;
};

const paymentStatusInitialState = {
  paymentState: PAYMENT_STATE.DEFAULT,
  keepPolling: false, // TODO: GRM: FIX both debugging items (this is one)
  counter: 5, // debugging
};

const paymentStatus = (state = paymentStatusInitialState, action = null) => {
  // TODO: GRM: this logic can easily be changed to do status detection.
  /**
   * @param {{keepPolling: boolean, counter: number, paymentState: string}} instate
   * @return boolean
   */
  const shouldPoll = (instate) => ((instate.counter - 1) > 0);

  // const shouldPoll = (instate) => instate.paymentState === PAYMENT_STATE.PENDING
  //                                       || instate.paymentState === PAYMENT_STATE.PROCESSING;

  if (action != null) {
    switch (action.type) {
      case updatePaymentStatus.TRIGGER:
        return { ...state, counter: paymentStatusInitialState.counter, keepPolling: true };

      case updatePaymentStatus.FULFILL:
        return { ...state, keepPolling: false };

      case PAYMENT_STATUS_DATA_RECEIVED:
        return {
          ...state,
          keepPolling: shouldPoll(state),
          counter: state.counter - 1, // TODO: GRM: Remove after UI Testing. Will use status value.
          ...action.payload,
        };

      default:
    }
  }
  return state;
};

const reducer = combineReducers({
  basket,
  captureKey,
  clientSecret,
  paymentStatus,
});

export default reducer;
