'use strict';


/**
 *
 * @param {String} message
 * @param {String} file
 * @param {any} data
 *
 * @returns {IResponseModel}
 *
 */
const CreateResponseModel = (message, file, data) => {
  const options = [
    {
      title: 'ActivatedUser',
      message: 'Activated user.',
    },
    {
      title: 'AddFavouritePlayer',
      message: 'Added favourite player.',
    },
    {
      title: 'AuthenticatedUser',
      message: 'User is authenticated.',
    },
    {
      title: 'CreatedUser',
      message: 'Created user.',
    },
    {
      title: 'CreatedPlayer',
      message: 'Created player.',
    },
    {
      title: 'DeletedPlayer',
      message: 'Deleted player.',
    },
    {
      title: 'DeletedUser',
      message: 'Deleted user.',
    },
    {
      title: 'RefreshAuthenticatedUser',
      message: 'User authentication is refreshed.',
    },
    {
      title: 'SentEmailActivation',
      message: 'Activation email sent.',
    },
    {
      title: 'SentEmailChangePassword',
      message: 'Sent email to confirm password change.',
    },
    {
      title: 'SentPlayersList',
      message: 'Sent players list.',
    },
    {
      title: 'SentPlayerProfile',
      message: 'Sent player profile.',
    },
    {
      title: 'SentUserProfile',
      message: 'Sent user profile.',
    },
    {
      title: 'SentVideosSerch',
      message: 'Sent the searched videos.',
    },
    {
      title: 'PasswordChanged',
      message: 'Password changed.',
    },
    {
      title: 'UpdatedPlayer',
      message: 'Updated player.',
    },
    {
      title: 'UpdatedProfile',
      message: 'Updated user profile.',
    },
    {
      title: 'VideoAdded',
      message: 'Video added to player.',
    },
    {
      title: 'YoutubeConnectionError',
      message: 'Error in connection with Youtube.',
    },
  ];

  const { title } = options.find(option => option.message === message);


  return {
    title,
    message,
    file,
    data,
  };
};


module.exports = {
  CreateResponseModel,
};
