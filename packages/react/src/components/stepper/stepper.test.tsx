import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper, StepperItem } from './stepper';

describe('Stepper Component & A11y', () => {
  it('renders step items and sets active step aria-current', () => {
    render(
      <Stepper>
        <StepperItem step={1} completed>Account</StepperItem>
        <StepperItem step={2} active>Profile</StepperItem>
        <StepperItem step={3}>Confirm</StepperItem>
      </Stepper>
    );

    expect(screen.getByText('Profile').closest('.sora-stepper__item')).toHaveAttribute('aria-current', 'step');
  });
});