export type Marker = {
  position: { lat: number; lng: number };
  text: string;
  to: string;
  selected?: boolean;
};
