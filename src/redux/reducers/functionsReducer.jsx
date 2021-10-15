import {
  ENABLE_DISABLE_SEARCH_BAR,
  ENABLE_BUTTON, DISABLE_BUTTON,
  ENABLE_DISABLE_FINISH_BUTTON,
  LOAD_DETAILS_VALUES,
} from '../actions';

const initialState = {
  enableSearch: false,
  enableButton: false,
  disableButton: true,
  disableFinishButton: true,
  loadValues: true,
};

const functionsReducer = (state = initialState, { type, change, value }) => {
  switch (type) {
  case ENABLE_DISABLE_SEARCH_BAR:
    return { ...state, enableSearch: change };
  case ENABLE_BUTTON:
    return { ...state, enableButton: change };
  case DISABLE_BUTTON:
    return { ...state, disableButton: !state.disableButton };
  case ENABLE_DISABLE_FINISH_BUTTON:
    return {
      ...state,
      disableFinishButton: value,
    };
  case LOAD_DETAILS_VALUES:
    return {
      ...state,
      loadValues: value,
    };
  default:
    return state;
  }
};

export default functionsReducer;
