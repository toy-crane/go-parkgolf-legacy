export type Marker = {
  position: { lat: number; lng: number };
  text: string;
  to: string;
  selected?: boolean;
};

export type Position = {
  level: number;
  center: { lat: number; lng: number };
};
