'use strict';


const httpErrorResponseMapper = (err) => {
  const optionsHttp = [
    {
      status: 400,
      title: 'RequestDataError',
      message: 'Invalid request data.',
      data: [],
    },
    {
      status: 400,
      title: 'ValidateDataError',
      message: 'Wrong input data.',
      data: err.data,
    },
    {
      status: 401,
      title: 'AuthenticateError',
      message: 'Unauthorized user.',
      data: [],
    },
    {
      status: 409,
      title: 'ActivatedUserError',
      message: 'Already active user.',
      data: [],
    },
    {
      status: 409,
      title: 'CreateUserError',
      message: 'User already exists in database.',
      data: [],
    },
    {
      status: 409,
      title: 'ExpiredCodeError',
      message: 'Expired activation code.',
      data: [],
    },
    {
      status: 500,
      title: 'InternalServerError',
      message: 'Internal server error.',
      data: [],
    },
  ];


  const errorResponse = optionsHttp.filter(option => option.message === err.message);


  return errorResponse[0];
};


module.exports = {
  httpErrorResponseMapper,
};
