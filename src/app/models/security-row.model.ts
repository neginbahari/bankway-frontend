export type FieldRequirement = 'optional' | 'required';

export interface SecurityRowField {
  label: string;
  requirement: FieldRequirement;
  requirementText: '(Optional)' | '(Required)';
  selected: boolean;
}

export interface SecurityRow {
  id: number;
  status: string;
  currency1: string;
  currency2: string;
  currency3: string;
  currency4: string;
  market: string;
  field: SecurityRowField;
}
