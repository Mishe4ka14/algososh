import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StringComponent } from "./string";
import { BrowserRouter } from 'react-router-dom';
import { DELAY_IN_MS } from '../../constants/delays';

const renderComponent = () => {
    render(
        <BrowserRouter>
            <StringComponent />
        </BrowserRouter>
    );
};

const reverseString = async (inputValue, expectedValues, timeout) => {
    const inputElement = screen.getByTestId('input');
    fireEvent.change(inputElement, { target: { value: inputValue } });

    const buttonElement = screen.getByTestId('button');
    fireEvent.click(buttonElement);

    await waitFor(() => {
        const circles = screen.getAllByTestId('circle');
        expectedValues.forEach((value, index) => {
            expect(circles[index]).toHaveTextContent(value.toString());
        });
    }, { timeout });
};

describe('String Component', () => {
    beforeEach(() => {
        renderComponent();
    });

    it('строка разворачивается корректно с четным количеством символов', async () => {
        await reverseString('1234', ['4', '3', '2', '1'], DELAY_IN_MS * 3);
    });

    it('строка разворачивается корректно с нечетным количеством символов', async () => {
        await reverseString('123', ['3', '2', '1'], DELAY_IN_MS * 2);
    });

    it('строка разворачивается корректно с одним символом', async () => {
        await reverseString('1', ['1'], DELAY_IN_MS * 2);
    });

    it('пустая строка разворачивается корректно', async () => {
        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).toBeDisabled();
    });
});