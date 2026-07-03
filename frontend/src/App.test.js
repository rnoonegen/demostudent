import { render, screen } from '@testing-library/react';
import App from './App';

test('renders growth platform', () => {
  render(<App />);
  expect(screen.getByText(/GrowthPath/i)).toBeInTheDocument();
});
