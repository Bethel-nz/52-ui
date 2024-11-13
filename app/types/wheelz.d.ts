declare module 'wheelz' {
  interface WheelzOptions {
    friction?: number
    acceleration?: number
    preset?: 'normal' | 'smooth' | 'instant' | 'bounce' | 'slow'
    draggable?: boolean
  }

  class Wheelz {
    constructor(options?: WheelzOptions)
    on(event: string, handler: (...args: unknown[]) => void): void
    off(event?: string, handler?: (...args: unknown[]) => void): void
  }

  export default Wheelz
} 