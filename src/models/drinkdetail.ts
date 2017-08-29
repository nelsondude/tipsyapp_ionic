import {Playlist} from './playlist'
import {Layer} from './layer';

export class DrinkDetail {
  constructor(name: string,
              embedUrl: string,
              timestamp: string,
              rating: number,
              playlists: Playlist[],
              layers: Layer[]) {}
}
