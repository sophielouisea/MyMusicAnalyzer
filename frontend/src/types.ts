export interface UserSession {
  [key: string]: string | boolean | undefined;
  hasValidToken?: boolean;
  isAuthenticated?: boolean;
  userName?: string;
  userEmail?: string;
  hasTrends?: boolean;
}

export interface ModalViews {
  [key: string]: boolean | undefined;
  topArtistsModal: boolean;
  topTracksModal: boolean;
  topGenresModal: boolean;
  trendsModal: boolean;
  enableTrendsModal: boolean;
}

export interface SliceInitialState {
  [key: string]: string | boolean | undefined | UserSession | ModalViews;
  isLoading: boolean;
  requestSuccess?: boolean;
  requestError?: boolean;
  data: UserSession | ModalViews;
}

export interface TopArtists {
  [key: string]: string
  name: string
}
