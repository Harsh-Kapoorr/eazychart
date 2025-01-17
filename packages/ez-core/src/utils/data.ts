import {
  RawDatum,
  NormalizedDatum,
  RawData,
  NormalizedDataDict,
} from '../types';

export const findDatumLabel = (datum: RawDatum) => {
  const labelKey = Object.keys(datum).find(
    (key: string) => typeof datum[key] === 'string'
  );
  return labelKey ? datum[labelKey] : undefined;
};

export const normalizeData = (
  data: RawData,
  colors: string[],
  forceColor = false,
  labelKey = 'label'
): NormalizedDataDict => {
  return data
    .map((d: RawDatum, index: number) => {
      return {
        ...d,
        color:
          (!forceColor && d.color) ||
          (colors.length && colors[index % colors.length]) ||
          '#1f77b4',
        id: d.id || index.toString(),
        isActive: 'isActive' in d ? d.isActive : true,
        label:
          labelKey in d ? d[labelKey] : findDatumLabel(d) || index.toString(),
      } as NormalizedDatum;
    })
    .reduce((acc: NormalizedDataDict, d: NormalizedDatum) => {
      acc[d.id] = d;
      return acc;
    }, {} as NormalizedDataDict);
};
