import { Metal } from '../data/twinborn-combinations';

export type Filter = {
  AllomanticMetal?: Metal;
  FeruchemicalMetal?: Metal;
  Compounders?: boolean;
};

export type FilterType = keyof Filter;
