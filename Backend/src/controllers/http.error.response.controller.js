'use strict';


// eslint-disable-next-line no-unused-vars
const httpErrorResponseController = httpErrorResponseMapper => async(err, _req, res, _next) => {
  if (err.title === 'ErrorRoute') {
    return res.status(400).send('The requested routing does not exist.');
  }

  const { status, message, data } = httpErrorResponseMapper(err);
  if (data.length === 0) return res.status(status).send({ message });


  return res.status(status).send({
    message,
    data,
  });
};


module.exports = {
  httpErrorResponseController,
};
