import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'customer/CREATE_REQUEST',
  CREATE_SUCCESS: 'customer/CREATE_SUCCESS',
  CREATE_FAILURE: 'customer/CREATE_FAILURE',

  GET_ALL_REQUEST: 'customer/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'customer/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'customer/GET_ALL_FAILURE',

  EDIT_REQUEST: 'customer/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'customer/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'customer/EDIT_REQUEST_FAILURE',

  REMOVE_REQUEST: 'customer/REMOVE_REQUEST',
  REMOVE_REQUEST_SUCCESS: 'customer/REMOVE_REQUEST_SUCCESS',
  REMOVE_REQUEST_FAILURE: 'customer/REMOVE_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'customer/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  debits: [],
  data: [],
});

export const Creators = {
  createCustomer: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createCustomerSuccess: customer => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Cliente Criado com Sucesso', customer },
  }),

  createCustomerFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'Houve um erro ao Criar o Cliente' },
  }),

  getAllCustomers: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllCustomersSuccess: customers => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { customers },
  }),

  getAllCustomersFailure: () => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error: 'Houve um erro na leitura dos Orçamentos' },
  }),

  editCustomer: customer => ({
    type: Types.EDIT_REQUEST,
    payload: { customer },
  }),

  editCustomerSuccess: ({ customerEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Cliente Editado com Sucesso', customerEdited, index },
  }),

  editCustomerFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Editar o Cliente' },
  }),

  removeCustomer: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeCustomerSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { message: 'Cliente Removido com Sucesso', id },
  }),

  removeCustomerFailure: () => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Remover o Cliente' },
  }),

  unsubscribeCustomerEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const customer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.CREATE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.CREATE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        data: [payload.customer, ...state.data],
        error: null,
      };

    case Types.CREATE_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.GET_ALL_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.GET_ALL_SUCCESS:
      return {
        ...state,
        data: [...payload.customers],
        error: null,
      };

    case Types.GET_ALL_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.EDIT_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        message: payload.message,
        data: Object.assign([], state.data, { [payload.index]: payload.customerEdited }),
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.REMOVE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.REMOVE_REQUEST_SUCCESS:
      return {
        ...state,
        message: payload.message,
        data: state.data.filter(item => item.id !== payload.id),
      };

    case Types.REMOVE_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.UNSUBSCRIBE_EVENTS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default customer;
