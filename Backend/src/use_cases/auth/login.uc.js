'use strict';


const loginUseCase = ({
  checkHashPasswordEntitie,
  CreateErrorResponseModel,
  CreateResponseModel,
  createTokensEntitie,
  findUserByEmail,
  saveRefreshTokenRepositorie,
  validateUserDataEntitie,
}) => async(inputData, ip, userAgent) => {
  const validatedInputData = await validateUserDataEntitie(inputData);
  if (validatedInputData.length > 0) {
    return CreateErrorResponseModel('Wrong input data.', validatedInputData);
  }


  const findedUser = await findUserByEmail(inputData.email);
  if (findedUser instanceof Error) return CreateErrorResponseModel(findedUser.message, findedUser);
  if (findedUser[0].activatedAt === 0) {
    return CreateErrorResponseModel('User is not activated.', findedUser);
  }


  if (!checkHashPasswordEntitie(inputData.password, findedUser[0].password)) {
    return CreateErrorResponseModel('Wrong email o password.', []);
  }


  const authTokens = await createTokensEntitie({
    userId: findedUser[0]._id,
    role: findedUser[0].role,
    sport: findedUser[0].sport,
    playerId: findedUser[0].agentOf.playerId,
  });
  if (authTokens instanceof Error) return CreateErrorResponseModel(authTokens.message, authTokens);


  const savedRefreshToken = await saveRefreshTokenRepositorie(
    authTokens, findedUser[0], ip, userAgent,
  );
  // if (savedRefreshToken instanceof Error) {
  //   return CreateErrorResponseModel(savedRefreshToken.message, savedRefreshToken);
  // }


  return CreateResponseModel('User is authenticated.', [authTokens]);
};


module.exports = {
  loginUseCase,
};
