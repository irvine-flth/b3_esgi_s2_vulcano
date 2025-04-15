export interface Volcano {
  id?: number;
  name: string;
  latitude: string;
  longitude: string;
  elevation?: number;
  type?: string;
  country?: string;
  regionGroup?: string;
  activity?: string;
  lastEruption?: string;
}
