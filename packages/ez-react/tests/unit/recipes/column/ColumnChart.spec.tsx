import React from 'react';
import { colors, dimensions, rawData } from '@ez/dev/jest/data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { ColumnChart } from '@/recipes/column/ColumnChart';
import 'tests/mocks/ResizeObserver';

describe('ColumnChart', () => {
  it('renders a column chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <ColumnChart
          rawData={rawData}
          colors={colors}
          grid={{ directions: [] }}
          dimensions={dimensions}
        />
      );
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });

    // 2nd render
    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
