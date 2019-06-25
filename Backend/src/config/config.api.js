'use strict';


const languageOptions = ['en', 'es'];

const nationalityOptions = ['spanish', 'portuguese', 'french'];

const maxResultsSearch = ['5', '10', '15', '20'];

const orderSearchOptions = ['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount'];

const preferredFootOptions = ['left', 'rigth'];

const preferredPositionsOptions = ['GK', 'CB', 'LB', 'RB', 'DM', 'LDM', 'RDM', 'LW', 'RW', 'FW'];

const roleOptions = ['user', 'agent', 'team', 'admin'];

const sportOptions = ['soccer'];

const whiteList = /^[ %&'-.@/0-9A-Z_a-z]+$/;


module.exports = {
  languageOptions,
  nationalityOptions,
  maxResultsSearch,
  orderSearchOptions,
  preferredFootOptions,
  preferredPositionsOptions,
  roleOptions,
  sportOptions,
  whiteList,
};
