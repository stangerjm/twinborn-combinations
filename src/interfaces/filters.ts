import { Metal } from '../data/twinborn-combinations';

export type Filter = {
  AllomanticMetal?: Metal;
  FeruchemicalMetal?: Metal;
  Compounders?: boolean;
  Search?: string;
};

export type FilterType = keyof Omit<Filter, 'Search'>;
