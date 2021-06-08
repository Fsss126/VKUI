import { useEffect, useState } from 'react';
import { useDOM } from '../lib/dom';

export function useFocusVisible(): boolean {
  const { document } = useDOM();

  const [isFocusVisible, toggleFocusVisible] = useState<boolean>(true);

  useEffect(() => {
    const addFocusVisible = ({ key }: KeyboardEvent) => {
      if (key.toUpperCase() === 'TAB') {
        toggleFocusVisible(true);
      }
    };

    const removeFocusVisible = () => {
      toggleFocusVisible(false);
    };

    const eventOptions = {
      passive: true,
      capture: true,
    };

    document.addEventListener('keydown', addFocusVisible, eventOptions);

    document.addEventListener('mousedown', removeFocusVisible, eventOptions);
    document.addEventListener('touchstart', removeFocusVisible, eventOptions);

    return () => {
      document.removeEventListener('keydown', addFocusVisible);

      document.removeEventListener('mousedown', removeFocusVisible);
      document.removeEventListener('touchstart', removeFocusVisible);
    };
  }, []);

  return isFocusVisible;
}
