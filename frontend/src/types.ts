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
    | ArtistItem[];
  isLoading: boolean;
  requestSuccess?: boolean;
  requestError?: boolean;
  data: UserSession | ModalViews | ArtistItem[];
}

export interface TopArtists {
  [key: string]: string;
  name: string;
}

export interface SpotifyItem {
  [key: string]: string | ArtistItem;
  type: string;
  item: ArtistItem;
}

export interface ArtistItem {
  [key: string]: string | number | string[];
  id: string;
  name: string;
  popularity: number;
  image: string;
  personal_ranking: number;
  genres: string[];
}
