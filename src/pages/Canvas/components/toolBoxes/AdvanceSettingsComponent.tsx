import { useEffect, useRef, RefObject } from 'react';

interface AdvanceSettingsComponentProps {
  settingsComponent: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  defaultButtonsBackground?: string;
}

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  isActive: boolean = true
): void => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, isActive]);
};

export const AdvanceSettingsComponent: React.FC<AdvanceSettingsComponentProps> = ({
  settingsComponent,
  isActive,
  onClose,
  defaultButtonsBackground = ''
}) => {
  const settingsRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsRef, onClose, isActive);

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