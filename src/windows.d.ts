import type { electronApiInterface } from '../electron/preload'

declare global {
  interface Window {
    electronAPI: electronApiInterface;
  }
}

declare global{
  interface EventTarget{
    tagName:string
  }
}