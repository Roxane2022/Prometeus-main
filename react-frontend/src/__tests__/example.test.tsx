import { render } from '@testing-library/react'
import HomePage from '../pages/HomePage'

describe('random', () => {
  it('should be true', async () => {
    render(<HomePage />);
    expect(true).toBe(true);
  });
})