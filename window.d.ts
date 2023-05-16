interface Window {
  aa: string
}
declare let window: Window & typeof globalThis;

// ts 默认 declare var window: Window & typeof globalThis;