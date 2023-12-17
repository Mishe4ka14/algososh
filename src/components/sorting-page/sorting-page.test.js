import { render, screen, fireEvent } from '@testing-library/react';
import { SortingPage } from './sorting-page';
import { BrowserRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import { DELAY_IN_MS } from '../../constants/delays';

describe('Sorting Page', () => {
  const renderComponent = (arrLength) => {
    render(
      <BrowserRouter>
        <SortingPage arrLength={arrLength} />
      </BrowserRouter>
    );
  };

  it('Пустой массив', () => {
    renderComponent(0);
    const array = screen.getByTestId('array');
    expect(array).toBeEmptyDOMElement();
  });

  it('Массив с одним числом', () => {
    renderComponent(1);
    const array = screen.getByTestId('array');
    expect(array.childNodes.length).toBe(1);
  });

  it('Массив с числами во возрастанию', async () => {
    renderComponent(3);
    const arr = screen.queryAllByTestId('column').map(item => item.textContent);
    const sortedArr = [...arr].sort((a, b) => a - b);

    const buttonElement = screen.getByTestId('btn-up');
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const newArr = screen.queryAllByTestId('column').map(item => item.textContent);
      expect(newArr).toStrictEqual(sortedArr);
    }, { timeout: DELAY_IN_MS * 2 });
  });

  it('Массив с числами по убыванию', async () => {
    renderComponent(3);
    const arr = screen.queryAllByTestId('column').map(item => item.textContent);
    const sortedArr = [...arr].sort((a, b) => b - a);

    const buttonElement = screen.getByTestId('btn-down');
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const newArr = screen.queryAllByTestId('column').map(item => item.textContent);
      expect(newArr).toStrictEqual(sortedArr);
    }, { timeout: DELAY_IN_MS * 2 });
  });
});
