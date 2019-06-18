'use strict';


const checkJwtUseCase = ({
  checkJwtTokenEntitie,
  CreateErrorResponseModel,
}) => async(authorization) => {
  if (!authorization) return CreateErrorResponseModel('Unauthorized user.', []);

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'Bearer') return CreateErrorResponseModel('Unauthorized user.', []);

  if (!token) return CreateErrorResponseModel('Unauthorized user.', []);

  const decoded = await checkJwtTokenEntitie(token);
  if (decoded instanceof Error) return CreateErrorResponseModel('Unauthorized user.', []);

  return {
    userId: decoded.userId,
    role: decoded.role,
    sport: decoded.sport,
    playerId: decoded.playerId,
  };
};


module.exports = {
  checkJwtUseCase,
};
