import { DataCard } from './data-card';

export type ValueLabelObj = {
  value: string;
  label: string;
};

export type ValueLabelObjWithUrl = ValueLabelObj & {
  url: string;
  target: string;
};

export type Tag =
  {
  text: string;
  color: string;
  url?: string;
  target?:string;
  iconName?: string;
}|{
  text: string;
  color: string;
  eventIdentifier?: string;
  iconName?: string;
};

export type DownloadObj = {
  label: string;
  url: string;
  position?: 'metadata-container';
};

export type ActionButtonInterface =
  | {
  label: string;
  url: string;
  urlTarget?: string;
  iconName: string;
  position?: 'metadata-container';
}
  | {
  label: string;
  iconName: string;
  eventIdentifier: string;
  position?: 'metadata-container';
};

export type ActionEvent = {
  eventIdentifier: string;
  dataObject: DataCard;
};

export type TextPropType = string | ValueLabelObj;
