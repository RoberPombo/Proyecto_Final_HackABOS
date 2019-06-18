export interface IAuthTokens {
  jwtToken: string;
  jwtExpiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
}

export interface ILoginHttpResponse {
  id: string;
  message: string;
  data: IAuthTokens[];
}

export interface IRegisterHttpResponse {
  id: string;
  message: string;
  data: [];
}


export interface IUserProfile {
  email: string;
  role: string;
  language: string;
  sport: string;
  agentOf: {
    playerId: string;
    sport: string;
    createdAt: string;
    deletedAt: string;
  };
  profile: {
    fullName: string;
    document: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    mobile: string;
    email: string;
    other: string;
  };
}

export interface IUserProfileHttpResponse {
  id: string;
  message: string;
  data: IUserProfile;
}
