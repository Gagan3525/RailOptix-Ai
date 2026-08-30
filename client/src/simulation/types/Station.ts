export interface Station {
  id: string;

  code: string;

  name: string;

  x: number;

  y: number;

  platforms: number;

  occupiedPlatforms: number;

  zone: string;
}