import React from "react";
import styles from "./styles.css";
import { Progress } from "antd";
import * as steps from "./tutorialSteps";

interface PreviousLinkProps {
  currentStep: number;
  previousStep: () => any;
}

const PreviousLink = ({ currentStep, previousStep }: PreviousLinkProps) =>
  currentStep === 0 ? null : (
    <a onClick={previousStep}>
      « {steps.getTutorialStepHeader(currentStep - 1)} «
    </a>
  );

interface NextLinkProps {
  currentStep: number;
  nextStep: () => any;
}

const NextLink = ({ currentStep, nextStep }: NextLinkProps) =>
  currentStep === steps.totalNumSteps - 1 ? (
    <span>» Brainwash complete!</span>
  ) : (
    <a onClick={nextStep}>» {steps.getTutorialStepHeader(currentStep + 1)} »</a>
  );

interface TodoTutorialProps {
  currentStep: number;
  nextStep: () => any;
  previousStep: () => any;
  className?: string;
}
const NavButtons = ({
  currentStep,
  nextStep,
  previousStep,
  className
}: TodoTutorialProps) => (
  <div className={className}>
    <PreviousLink currentStep={currentStep} previousStep={previousStep} />
    <span>{steps.getTutorialStepHeader(currentStep)}</span>
    <NextLink currentStep={currentStep} nextStep={nextStep} />
  </div>
);

const TodoTutorial = (props: TodoTutorialProps) => {
  const { currentStep, nextStep, previousStep } = props;
  return (
    <div className={styles.tutorial}>
      <div className={styles.steps}>
        <Progress
          percent={(100 * (currentStep + 1)) / steps.totalNumSteps}
          strokeWidth={20}
          showInfo={false}
        />
      </div>
      <NavButtons className={`${styles.nav} ${styles.top}`} {...props} />
      <NavButtons className={`${styles.nav} ${styles.bottom}`} {...props} />
      <div className={styles.main}>{steps.getTutorialStep(currentStep)}</div>
    </div>
  );
};

export default TodoTutorial;
