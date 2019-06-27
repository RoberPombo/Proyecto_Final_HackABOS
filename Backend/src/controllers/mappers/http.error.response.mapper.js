'use strict';

// Declared environment variables ==================================================================
const { URL_FRONT: urlFront } = process.env;


const httpErrorResponseMapper = (err) => {
  const optionsHttp = [
    // Status 400 ==================================================================================
    {
      status: 400,
      title: 'RequestDataError',
      message: 'Invalid request data.',
      data: {},
    },
    {
      status: 400,
      title: 'ValidateDataError',
      message: 'Wrong input data.',
      data: err.data,
    },
    // Status 401 ==================================================================================
    {
      status: 401,
      title: 'AuthenticateError',
      message: 'Unauthorized user.',
      data: {},
    },
    {
      status: 401,
      title: 'RefreshAuthenticateError',
      message: 'Unauthorized refresh token.',
      data: {},
    },
    // Status 403 ==================================================================================
    {
      status: 403,
      title: 'AccessError',
      message: 'Forbidden access.',
      data: {},
    },
    // Status 404 ==================================================================================
    {
      status: 404,
      title: 'UserExistError',
      message: 'User does not exist.',
      data: {},
    },
    // Status 409 ==================================================================================
    {
      status: 409,
      title: 'ActivatedUserError',
      message: 'Already active user.',
      redirectTo: `${urlFront}/auth`,
      data: {},
    },
    {
      status: 409,
      title: 'AddFavouritePlayerError',
      message: 'Player has already been added.',
      data: {},
    },
    {
      status: 409,
      title: 'AddVideoError',
      message: 'Video has already been added.',
      data: {},
    },
    {
      status: 409,
      title: 'CreatePlayerError',
      message: 'Player already exists in database.',
      data: {},
    },
    {
      status: 409,
      title: 'CreateUserError',
      message: 'User already exists in database.',
      data: {},
    },
    {
      status: 409,
      title: 'ExpiredCodeError',
      message: 'Expired activation code.',
      data: {},
    },
    // Status 500 ==================================================================================
    {
      status: 500,
      title: 'InternalServerError',
      message: 'Internal server error.',
      data: {},
    },
    // Status 503 ==================================================================================
    {
      status: 503,
      title: 'YoutubeConnectionError',
      message: 'Error in connection with Youtube.',
      data: {},
    },
  ];


  const {
    status, title, data, redirectTo,
  } = optionsHttp.find(option => option.message === err.message);


  return {
    status,
    title,
    message: err.message,
    file: err.file,
    redirectTo,
    data,
  };
};


module.exports = {
  httpErrorResponseMapper,
};
