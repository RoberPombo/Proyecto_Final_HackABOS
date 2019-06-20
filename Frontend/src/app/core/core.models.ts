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
  _id: string;
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


export interface IVideosModel {
  videoId: string;
  likes: number;
  views: number;
  publishAt: number;
}


export interface IPlayerProfile {
  _id?: string;
  userId?: string;
  fullName: string;
  birthdate: number;
  nationality: string;
  height: number;
  weight: number;
  sport: string;
  team: string;
  preferredFoot: string;
  preferredPositions: string[];
  videos?: IVideosModel[];
  createdAt?: number;
  modifiedAt?: number;
  deletedAt?: number;
}


export interface IPlayerProfileHttpResponse {
  id: string;
  message: string;
  data: IPlayerProfile;
}


export interface IYoutubeVideosModel {
  channelTitle: string;
  dislikeCount: number;
  embedHtml: string;
  id: string;
  likeCount: string;
  publishedAt: string;
  title: string;
  viewCounts: number;
  thumbnails: {
    default: { url: string };
    standard: { url: string };
    medium: { url: string };
    maxres: { url: string };
    high: { url: string };
  };
}


export interface IYoutubeHttpResponse {
  nextPageToken: string;
  prevPageToken?: string;
  totalResults: number;
  items: IYoutubeVideosModel[];
}
