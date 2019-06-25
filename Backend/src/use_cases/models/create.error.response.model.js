'use strict';


const CreateErrorResponseModel = (message, file, error) => {
  const optionsErrorsHttp = [
    {
      title: 'AccessError',
      message: 'Forbidden access.',
    },
    {
      title: 'ActivatedUserError',
      message: 'Already active user.',
    },
    {
      title: 'AuthenticateError',
      message: 'Unauthorized user.',
    },
    {
      title: 'ChangePasswordError',
      message: 'Confirmation email expired.',
    },
    {
      title: 'CreateUserError',
      message: 'User already exists in database.',
    },
    {
      title: 'CreatePlayerError',
      message: 'Player already exists in database.',
    },
    {
      title: 'ExpiredCodeError',
      message: 'Expired activation code.',
    },
    {
      title: 'InternalServerError',
      message: 'Internal server error.',
    },
    {
      title: 'RefreshAuthenticateError',
      message: 'Unauthorized refresh token.',
    },
    {
      title: 'RequestDataError',
      message: 'Invalid request data.',
    },
    {
      title: 'UserExistError',
      message: 'User does not exist.',
    },
    {
      title: 'ValidateDataError',
      message: 'Wrong input data.',
    },
  ];


  class ErrorResponse extends Error {
    constructor(data) {
      super(data.message);
      this.title = data.title;
      this.file = data.file;
      this.data = data.data;
    }
  }


  const optionHttp = optionsErrorsHttp.find(option => option.message === message);

  const { title } = (optionHttp) || optionsErrorsHttp[0];


  const errorResponse = new ErrorResponse({
    title,
    message,
    file,
    data: error,
  });

  return errorResponse;
};


module.exports = {
  CreateErrorResponseModel,
};
