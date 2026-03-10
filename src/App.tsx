import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { HeroSection } from './components/HeroSection';
import { CalibrationStep } from './components/CalibrationStep';
import { SnapshotModal } from './components/SnapshotModal';
import { ProgressNodes } from './components/ProgressNodes';
import { QuestionStep } from './components/QuestionStep';
import { ProcessingEngine } from './components/ProcessingEngine';
import { ResultsDashboard } from './components/ResultsDashboard';
import { AppState, Industry, QUESTIONS } from './types';

const STORAGE_KEY = 'integr-ai-tion-state';

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return {
      industry: 'HVAC',
      truckCount: 15,
      currentStep: 0,
      answers: {},
      calculatedScore: 0,
      isAuthReady: false,
      isSnapshotOpen: false
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const calculateScore = (answers: Record<number, number>) => {
    const values = Object.values(answers);
    if (values.length === 0) return 62; // Starter score
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    // Blend starter score (62) with user answers
    return Math.round(62 * 0.3 + avg * 0.7);
  };

  const handleNext = () => {
    if (state.currentStep === 1) {
      updateState({ isSnapshotOpen: true });
    } else {
      updateState({ currentStep: state.currentStep + 1 });
    }
  };

  const handleBack = () => {
    updateState({ currentStep: Math.max(0, state.currentStep - 1) });
  };

  const handleAnswer = (value: number) => {
    const newAnswers = { ...state.answers, [state.currentStep - 2]: value };
    updateState({ 
      answers: newAnswers,
      calculatedScore: calculateScore(newAnswers)
    });
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <HeroSection onStart={() => updateState({ currentStep: 1 })} />;
      case 1:
        return (
          <CalibrationStep 
            industry={state.industry}
            truckCount={state.truckCount}
            onUpdate={(data) => updateState(data)}
            onNext={handleNext}
          />
        );
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        const qIndex = state.currentStep - 2;
        return (
          <div className="w-full">
            <ProgressNodes total={6} current={state.currentStep - 1} />
            <QuestionStep 
              question={QUESTIONS[qIndex]}
              selectedOption={state.answers[qIndex]}
              onSelect={handleAnswer}
              onBack={handleBack}
              onNext={handleNext}
              isFirst={qIndex === 0}
              isLast={qIndex === QUESTIONS.length - 1}
              truckCount={state.truckCount}
            />
          </div>
        );
      case 7:
        return <ProcessingEngine onComplete={() => updateState({ currentStep: 8 })} />;
      case 8:
        return (
          <ResultsDashboard 
            score={state.calculatedScore || 62}
            industry={state.industry}
            truckCount={state.truckCount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppShell>
      {renderStep()}
      <SnapshotModal 
        isOpen={state.isSnapshotOpen} 
        truckCount={state.truckCount}
        onClose={() => updateState({ isSnapshotOpen: false, currentStep: 2 })}
      />
    </AppShell>
  );
}
