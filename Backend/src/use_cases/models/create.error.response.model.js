'use strict';


/**
 * @type {ICreateErrorResponseModel}
*/
const CreateErrorResponseModel = (message, error) => {
  const optionsErrorsHttp = [
    {
      title: 'InternalServerError',
      message: 'Internal server error.',
      data: [],
    },
    {
      title: 'ActivatedUserError',
      message: 'Already active user.',
      data: [],
    },
    {
      title: 'CreateUserError',
      message: 'User already exists in database.',
      data: [],
    },
    {
      title: 'CreatePlayerError',
      message: 'Player already exists in database.',
      data: [],
    },
    {
      title: 'ExpiredCodeError',
      message: 'Expired activation code.',
      data: [],
    },
    {
      title: 'RequestDataError',
      message: 'Invalid request data.',
      data: [],
    },
    {
      title: 'AuthenticateError',
      message: 'Unauthorized user.',
      data: [],
    },
    {
      title: 'ValidateDataError',
      message: 'Wrong input data.',
      data: error,
    },
  ];


  class ErrorResponse extends Error {
    constructor(data) {
      super(data.message);
      this.title = data.title;
      this.data = data.data;
    }
  }


  const optionHttp = optionsErrorsHttp.filter(option => option.message === message);

  const optRes = (optionHttp.length === 0) ? optionsErrorsHttp[0] : optionHttp[0];

  const errorResponse = new ErrorResponse(optRes);


  return errorResponse;
};


module.exports = {
  CreateErrorResponseModel,
};
