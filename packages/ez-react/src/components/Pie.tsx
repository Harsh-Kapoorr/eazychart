import React, { FC, SVGAttributes, useMemo } from 'react';
import { useChart } from '@/lib/use-chart';
import { Arc } from './shapes/Arc';
import { Dimensions, Point, PieConfig } from 'eazychart-core/src/types';
import { ScaleLinear, scalePieArcData } from 'eazychart-core/src';

export interface PieProps
  extends PieConfig,
    Omit<SVGAttributes<SVGPathElement>, 'stroke' | 'strokeWidth'> {
  aScale: ScaleLinear;
  getCenter?: (dimensions: Dimensions) => Point;
  getRadius?: (dimensions: Dimensions) => number;
  startAngle?: number;
  endAngle?: number;
}

export const Pie: FC<PieProps> = ({
  startAngle = 0,
  endAngle = 2 * Math.PI,
  aScale,
  getCenter = ({ width, height }) => ({ x: width / 2, y: height / 2 }),
  getRadius = ({ width, height }) => Math.min(width, height) / 2,
  donutRadius = 0,
  cornerRadius = 0,
  padAngle = 0,
  padRadius = 0,
  stroke,
  strokeWidth,
  sortValues,
  ...rest
}) => {
  const { activeData, dimensions } = useChart();
  const { width, height } = dimensions;
  const center = getCenter({ width, height });
  const radius = getRadius({ width, height });
  const outerRadius = radius;
  const innerRadius = radius * donutRadius;

  const shapeData = useMemo(() => {
    return scalePieArcData(
      activeData,
      aScale,
      startAngle,
      endAngle,
      sortValues
    );
  }, [activeData, aScale, sortValues, startAngle, endAngle]);

  return (
    <g
      transform={`translate(${center.x},${center.y})`}
      {...rest}
      className="ez-pie"
    >
      {shapeData.map((shapeDatum) => {
        return (
          <Arc
            key={shapeDatum.id}
            shapeDatum={shapeDatum}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            padAngle={padAngle}
            padRadius={padRadius}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
};
