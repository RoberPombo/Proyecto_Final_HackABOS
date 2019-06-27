/* eslint-disable max-len */


// IagentOf ==========================================================
/**
 * @typedef IagentOf
 * @property {string} playerId            @property {string} sport
 * @property {number} createdAt           @property {number} deletedAt
 */
// Iprofile ==========================================================
/**
 * @typedef Iprofile
 * @property {string} fullName            @property {string} document
 * @property {string} address1            @property {string} address2
 * @property {string} city                @property {string} country
 */
// Icontact ==========================================================
/**
 * @typedef Icontact
 * @property {string} phone               @property {string} mobile
 * @property {string} email               @property {string} other
 */
// IchangePassword ===================================================
/**
 * @typedef IchangePassword
 * @property {string} uuid                @property {string} password
 * @property {number} sendAt
 */
// IactivationCode ===================================================
/**
 * @typedef {[{uuid:string, sendAt:number}]} IactivationCode
 */
// IUserModel ========================================================
/**
 * @typedef IUserModel
 * @property {string} [_id]               @property {string} email
 * @property {string} password            @property {string} role
 * @property {string} language            @property {string} sport
 * @property {number} createdAt           @property {number} modifiedAt
 * @property {number} deletedAt           @property {number} activatedAt
 * @property {IagentOf} [agentOf]         @property {Iprofile} profile
 * @property {Icontact} contact           @property {IchangePassword} [changePassword]
 * @property {IactivationCode} activationCode
 *
 */
// IinputData ========================================================
/**
 * @typedef IPlayerModel
 * @property {string} [_id]                @property {string} userId
 * @property {string} fullName             @property {number} birthdate
 * @property {string} nationality          @property {string} height
 * @property {string} weight               @property {string} sport
 * @property {string} team                 @property {string} preferredFoot
 * @property {string[]} preferredPositions @property {number} createdAt
 * @property {number} modifiedAt           @property {number} deletedAt
 */
// IResponseModel ====================================================
/**
 * @typedef IResponseModel
 * @property {string} title               @property {string} message
 * @property {any} data                   @property {string} file
 */
// ICreateResponseModel ==============================================
/**
 * @typedef {(message:string, data:any[]) => IResponseModel} ICreateResponseModel
 */
// ICreateErrorResponseModel =========================================
/**
 * @typedef {(message:string, error:any) => IResponseModel} ICreateErrorResponseModel
 */
// IcheckJwtTokenEntitie =============================================
/**
 * @typedef {(token:string) => Promise<object | Error>} IcheckJwtTokenEntitie
 */
// IinfoUser =========================================================
/**
 * @typedef IinfoUser
 * @property {string} userId            @property {string} role
 * @property {string} playerId
 */
// IauthTokens =======================================================
/**
 * @typedef IauthTokens
 * @property {string} jwtToken          @property {number} jwtExpiresIn
 * @property {string} refreshToken      @property {number} refreshExpiresIn
 */
// IcreateTokensEntitie ==============================================
/**
 * @typedef {(infoUser:IinfoUser) => Promise<IauthTokens | Error>} IcreateTokensEntitie
 */
// IcreateUuidV4Entitie ==============================================
/**
 * @typedef {() => string} IcreateUuidV4Entitie
 */
// IcreateHashPasswordEntitie ========================================
/**
 * @typedef {(password:string) => string} IcreateHashPasswordEntitie
 */
// IcheckHashPasswordEntitie =========================================
/**
 * @typedef {(password:string, securePassword:string) => boolean} IcheckHashPasswordEntitie
 */
// IsendConfirmChangePasswordEntitie =================================
/**
 * @typedef {(userEmail:string, uuid:string, sport:string,[language]:string) => Promise<boolean>} IsendConfirmChangePasswordEntitie
 */
// IsendEmailActivationEntitie =======================================
/**
 * @typedef {(userEmail:string, activationCode:string, sport:string, [language]:string) => Promise<boolean>} IsendEmailActivationEntitie
 */
// IvalidateUserDataEntitie ==========================================
/**
 * @typedef {(payload: | IUserModel) => Promise<{}>} IvalidateUserDataEntitie
 */
// IactivateUserUseCase ==============================================
/**
 * @typedef {(activationCode:string) => Promise<IResponseModel>} IactivateUserUseCase
 */
// IactivateUser =====================================================
/**
 * @typedef {(userId:string) => Promise<IUserModel>} IactivateUser
 */
// IaddActivationCode ================================================
/**
 * @typedef {(userId:string, activationCode:string) => Promise<IUserModel>} IaddActivationCode
 */
// IfindUserByActivationCode =========================================
/**
 * @typedef {(activationCode: string) => Promise<IUserModel>} IfindUserByActivationCode
 */
