'use strict';

/* eslint-disable security/detect-object-injection */
/* eslint-disable no-param-reassign */


const httpResponseMapper = (response) => {
  const optionsHttp = [{
    status: 200,
    title: 'ActivatedUser',
    message: 'Activated user.',
    data: [],
  },
  {
    status: 200,
    title: 'SentEmailActivation',
    message: 'Activation email sent.',
    data: [],
  },
  {
    status: 200,
    title: 'SentEmailChangePassword',
    message: 'Sent email to confirm password change.',
    data: [],
  },
  {
    status: 201,
    title: 'CreatedUser',
    message: 'Created user.',
    data: [],
  },
  {
    status: 201,
    title: 'CreatedPlayer',
    message: 'Created player.',
    data: [],
  },
  {
    status: 201,
    title: 'DeletedPlayer',
    message: 'Deleted player.',
    data: [],
  },
  {
    status: 201,
    title: 'DeletedUser',
    message: 'Deleted user.',
    data: [],
  },
  {
    status: 201,
    title: 'SentPlayerProfile',
    message: 'Sent player profile.',
    data: response.data,
  },
  {
    status: 201,
    title: 'SentUserProfile',
    message: 'Sent user profile.',
    data: (response.title === 'SentUserProfile')
      ? (Object.keys(response.data[0]).reduce((c, k) => {
        const arrayAux = ['password', 'createdAt', 'modifiedAt', 'activatedAt'];
        if (arrayAux.indexOf(k) === -1) {
          if (k === 'agentOf' && response.data[0].role !== 'scout') return c;
          c[k] = response.data[0][k];
        }
        return c;
      }, {})) : [],
  },
  {
    status: 201,
    title: 'UpdatedPlayer',
    message: 'Updated player.',
    data: [],
  },
  {
    status: 201,
    title: 'UpdatedProfile',
    message: 'Updated profile.',
    data: response.data,
  },
  {
    status: 201,
    title: 'VideoAdded',
    message: 'Video added.',
    data: [],
  },

  {
    status: 202,
    title: 'AuthenticatedUser',
    message: 'User is authenticated.',
    data: response.data,
  },
  {
    status: 202,
    title: 'PasswordChanged',
    message: 'Password changed.',
    data: [],
  },
  ];


  const httpResponse = optionsHttp.filter(
    option => option.message === response.message
  );


  return httpResponse[0];
};


module.exports = {
  httpResponseMapper,
};
