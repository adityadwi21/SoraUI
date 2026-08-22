import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/card/card';
import { Stepper, StepperItem } from '../../components/stepper/stepper';
import { Button } from '../../components/button/button';
import type { WizardStep } from '../types';

export interface MultiStepWizardProps {
  steps: WizardStep[];
  currentStep?: number;
  onStepChange?: (stepIndex: number) => void;
  onComplete?: () => void;
  loading?: boolean;
  className?: string;
}

export function MultiStepWizard({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  loading = false,
  className,
}: MultiStepWizardProps) {
  const [internalStep, setInternalStep] = useState(0);
  const activeStep = controlledStep ?? internalStep;

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      const next = activeStep + 1;
      setInternalStep(next);
      onStepChange?.(next);
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      const prev = activeStep - 1;
      setInternalStep(prev);
      onStepChange?.(prev);
    }
  };

  const currentStepData = steps[activeStep];

  return (
    <Card className={className} elevated>
      <CardHeader>
        <Stepper>
          {steps.map((step, idx) => (
            <StepperItem
              key={step.id}
              step={idx + 1}
              completed={idx < activeStep}
              active={idx === activeStep}
            >
              {step.title}
            </StepperItem>
          ))}
        </Stepper>
      </CardHeader>

      <CardContent style={{ minHeight: '200px', padding: '1.5rem 0' }}>
        {currentStepData?.description && (
          <p style={{ color: 'var(--ui-muted-foreground, #71717a)', fontSize: 'var(--sora-text-sm, 0.875rem)', marginBottom: '1rem' }}>
            {currentStepData.description}
          </p>
        )}
        {currentStepData?.component}
      </CardContent>

      <CardFooter style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--ui-border, #e4e4e7)', paddingTop: '1rem' }}>
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={activeStep === 0 || loading}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          loading={loading}
        >
          {activeStep === steps.length - 1 ? 'Complete' : 'Continue'}
        </Button>
      </CardFooter>
    </Card>
  );
}
