import { FieldConfig } from '../../shared/interfaces/field-config';

export const attestFieldConfig: FieldConfig[] = [
  {
    value: false,
    label: 'Möjlighet att se sina egna fakturor',
    name: 'value',
    type: 'radio',
  },
  {
    value: true,
    label: 'Möjlighet att se alla fakturor',
    name: 'value',
    type: 'radio',
  },
];

export const receiptManagementFieldConfig: FieldConfig[] = [
  {
    value: false,
    label: 'Möjlighet att se sina egna uppladade dokument',
    name: 'value',
    type: 'radio',
  },
  {
    value: true,
    label: 'Möjlighet att se alla uppladade dokument',
    name: 'value',
    type: 'radio',
  },
];
