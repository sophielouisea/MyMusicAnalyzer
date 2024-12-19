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
  [key: string]:
    | string
    | boolean
    | undefined
    | UserSession
    | ModalViews
    | TopItems
    | any;
  isLoading: boolean;
  requestSuccess?: boolean;
  requestError?: boolean;
  data: any // UserSession | ModalViews | TopItems | ;
}

export interface TopItems {
  [key: string]: Item[];
  short_term: Item[];
  medium_term: Item[];
  long_term: Item[];
}

export interface Item {
  [key: string]: string | number | string[];
  id: string;
  name: string;
  popularity: number;
  image: string;
  personal_ranking: number;
}

export interface ArtistItem extends Item {
  genres: string[];
}

export interface TrackItem extends Item {
  artist: string;
}

export interface ArtistsPopularity {
  highest: string
  highest_index: number
  average_index: number
  lowest: string
  lowest_index: number
}
