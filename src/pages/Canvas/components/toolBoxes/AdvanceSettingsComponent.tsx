import { useRef } from 'react';

interface AdvanceSettingsComponentProps {
  settingsComponent: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  defaultButtonsBackground?: string;
}


export const AdvanceSettingsComponent: React.FC<AdvanceSettingsComponentProps> = ({
  settingsComponent,
  isActive,
  defaultButtonsBackground = ''
}) => {
  const settingsRef = useRef<HTMLDivElement>(null);


  return (
    <>
      {settingsComponent && (
        <div 
          ref={settingsRef}
          className={`${defaultButtonsBackground} rounded-lg min-w-[max(20vw,300px)] min-h-[max(20vw,300px)] pointer-events-auto overflow-hidden transition-all duration-300 ease-in-out origin-center ${
            isActive 
              ? "scale-100 opacity-100" 
              : "scale-0 opacity-0 pointer-events-none"
          }`}
        >
          {settingsComponent}
        </div>
      )}
    </>
  );
};