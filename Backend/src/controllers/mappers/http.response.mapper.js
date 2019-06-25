'use strict';

/* eslint-disable security/detect-object-injection */
/* eslint-disable no-param-reassign */

// Declared environment variables ==================================================================
const { URL_FRONT: urlFront } = process.env;


const sentUserProfile = [
  'email', 'language', 'role', 'sport', 'agentOf', 'profile', 'contact', 'messages', 'fauvoritePlayers',
];
const sentPlayerProfile = [
  '_id', 'fullName', 'birthdate', 'nationality', 'height', 'weight', 'sport', 'team', 'preferredFoot', 'preferredPositions', 'videos',
];

const filteredObjectResponse = (object, typeFilter) => typeFilter.reduce((c, k) => {
  if (object[k]) c[k] = object[k];
  return c;
}, {});


const httpResponseMapper = (response) => {
  const optionsHttp = [
    // Status 200 ==================================================================================
    {
      status: 200,
      title: 'SentEmailActivation',
      message: 'Activation email sent.',
      data: {},
    },
    {
      status: 200,
      title: 'SentEmailChangePassword',
      message: 'Sent email to confirm password change.',
      data: {},
    },
    {
      status: 200,
      title: 'SentPlayerProfile',
      message: 'Sent player profile.',
      data: (response.message === 'Sent player profile.') ? filteredObjectResponse(response.data[0], sentPlayerProfile) : {},
    },
    {
      status: 200,
      title: 'SentUserProfile',
      message: 'Sent user profile.',
      data: (response.message === 'Sent user profile.') ? filteredObjectResponse(response.data[0], sentUserProfile) : {},
    },
    {
      status: 200,
      title: 'SentVideosSerch',
      message: 'Sent the searched videos.',
      data: response.data,
    },
    // Status 201 ==================================================================================
    {
      status: 201,
      title: 'CreatedUser',
      message: 'Created user.',
      data: {},
    },
    {
      status: 201,
      title: 'CreatedPlayer',
      message: 'Created player.',
      data: (response.message === 'Created player.') ? filteredObjectResponse(response.data, sentPlayerProfile) : {},
    },
    // Status 202 ==================================================================================
    {
      status: 202,
      title: 'AuthenticatedUser',
      message: 'User is authenticated.',
      data: response.data,
    },
    {
      status: 202,
      title: 'DeletedPlayer',
      message: 'Deleted player.',
      data: {},
    },
    {
      status: 202,
      title: 'DeletedUser',
      message: 'Deleted user.',
      data: {},
    },
    {
      status: 202,
      title: 'RefreshAuthenticatedUser',
      message: 'User authentication is refreshed.',
      data: response.data,
    },
    {
      status: 202,
      title: 'UpdatedPlayer',
      message: 'Updated player.',
      data: (response.message === 'Updated player.') ? filteredObjectResponse(response.data, sentPlayerProfile) : {},
    },
    {
      status: 202,
      title: 'UpdatedUser',
      message: 'Updated user profile.',
      data: (response.message === 'Updated user profile.') ? filteredObjectResponse(response.data, sentUserProfile) : {},
    },
    {
      status: 202,
      title: 'VideoAdded',
      message: 'Video added to player.',
      data: response.data.videos,
    },
    // Status 302 ==================================================================================
    {
      status: 302,
      title: 'ActivatedUser',
      redirectTo: `${urlFront}/auth`,
      message: 'Activated user.',
      data: {},
    },
    {
      status: 302,
      title: 'PasswordChanged',
      redirectTo: `${urlFront}/auth`,
      message: 'Password changed.',
      data: {},
    },
  ];


  const httpResponse = optionsHttp.find(
    option => option.message === response.message
  );


  return httpResponse;
};


module.exports = {
  httpResponseMapper,
};
