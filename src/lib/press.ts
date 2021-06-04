import { MouseEventHandler, MouseEvent, KeyboardEvent } from 'react';

export type VKUIPressEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;
export type VKUIPressEventHandler = (e: VKUIPressEvent) => void;

export interface HasPressEvent {
  /** @deprecated use `onPress` */
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * Событие при нажатии
   */
  onPress?: VKUIPressEventHandler;
}
