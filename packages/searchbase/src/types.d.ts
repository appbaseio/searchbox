type Suggestion = {
  label: string;
  value: string;
  source?: any;
};

type MicStatusField = 'INACTIVE' | 'ACTIVE' | 'DENIED';

type RequestStatus = 'INACTIVE' | 'PENDING' | 'ERROR';

type UpdateOn = 'change' | 'blur' | 'enter';
type QueryFormat = 'or' | 'and';

type DataField = {
  field: string;
  weight: number;
};

type SortOption = {
  label: string;
  dataField: string;
  sortBy: string;
};

type Options = {
  triggerQuery?: boolean;
  triggerSuggestionsQuery?: boolean;
  stateChanges?: boolean;
};

type Option = {
  stateChanges?: boolean;
};

type Observer = {
  callback: Function;
  properties?: string | Array<string>;
};

export {
  Suggestion,
  MicStatusField,
  RequestStatus,
  UpdateOn,
  QueryFormat,
  DataField,
  Options,
  Option,
  SortOption,
  Observer
};
