import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Track from "./index.js"


test('render Track', () => {
    render(<Track />);
    // const tittleDisplay = screen.getByText(/" "/i);
    const buttonDisplay = screen.getByText('Select');
    // userEvent.click(buttonDisplay);
    expect(buttonDisplay).toBeInTheDocument();
});