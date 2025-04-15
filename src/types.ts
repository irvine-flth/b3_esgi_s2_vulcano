export interface Volcano {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  type?: string;
  country?: string;
  regionGroup?: string;
  activity?: string;
  lastEruption?: string;
}
