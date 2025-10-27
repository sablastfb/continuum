import { platform } from '@tauri-apps/plugin-os';

export const isTauri = '__TAURI__' in window;
let cachedPlatform: string | null = null;
 
/// THIS DOES NTO WORK BUT I AM TIARD 
export const getPlatform = async () => {
  if (cachedPlatform !== null) {
    return cachedPlatform;
  }
  
  if ('__TAURI_INTERNALS__' in window) {
    try {
      cachedPlatform = await platform();
    } catch (error) {
      console.error('Failed to get platform:', error);
      cachedPlatform = 'unknown';
    }
  } else {
    // Fallback to browser detection
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Win')) cachedPlatform = 'win32';
    else if (userAgent.includes('Mac')) cachedPlatform = 'darwin';
    else if (userAgent.includes('Linux')) cachedPlatform = 'linux';
    else cachedPlatform = 'browser';
  }
  
  return cachedPlatform;
};