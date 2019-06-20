'use strict';


/**
 * @type {ICreateResponseModel}
*/
const CreateResponseModel = (message, data) => {
  const options = [{
    title: 'AuthenticatedUser',
    message: 'User is authenticated.',
    data,
  },
  {
    title: 'ActivatedUser',
    message: 'Activated user.',
    data,
  },
  {
    title: 'CreatedUser',
    message: 'Created user.',
    data: [],
  },
  {
    title: 'CreatedPlayer',
    message: 'Created player.',
    data: [],
  },
  {
    title: 'DeletedPlayer',
    message: 'Deleted player.',
    data: [],
  },
  {
    title: 'DeletedUser',
    message: 'Deleted user.',
    data: [],
  },
  {
    title: 'SentEmailActivation',
    message: 'Activation email sent.',
    data,
  },
  {
    title: 'SentEmailChangePassword',
    message: 'Sent email to confirm password change.',
    data: [],
  },
  {
    title: 'SentPlayerProfile',
    message: 'Sent player profile.',
    data,
  },
  {
    title: 'SentUserProfile',
    message: 'Sent user profile.',
    data,
  },
  {
    title: 'PasswordChanged',
    message: 'Password changed.',
    data: [],
  },
  {
    title: 'UpdatedPlayer',
    message: 'Updated player.',
    data: [],
  },
  {
    title: 'UpdatedProfile',
    message: 'Updated profile.',
    data: [],
  },
  {
    title: 'VideoAdded',
    message: 'Video added.',
    data: [],
  },
  ];

  const response = options.filter(option => option.message === message);


  return response[0];
};


module.exports = {
  CreateResponseModel,
};
