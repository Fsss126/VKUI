import { MouseEventHandler, MouseEvent, KeyboardEvent } from 'react';

export type VKUIPressEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;
export type VKUIPressEventHandler = (e: VKUIPressEvent) => void;

export interface HasPressEvent {
  /**
   * @deprecated для любых тегов, кроме `button` и `a`. Используйте `onPress`.
   */
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * Кастомное событие при нажатии
   */
  onPress?: VKUIPressEventHandler;
}
