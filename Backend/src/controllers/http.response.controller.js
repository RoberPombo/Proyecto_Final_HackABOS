'use strict';


const httpResponseController = httpResponseMapper => async(req, res, next) => {
  if (req.response && req.response.title) {
    const { response } = req;

    const { status, message, data } = httpResponseMapper(response);
    if (data.length === 0) return res.status(status).send({ message });


    return res.status(status).send({
      message,
      data,
    });
  }
  const err = { title: 'ErrorRoute' };


  return next(err);
};


module.exports = {
  httpResponseController,
};
