export type ShortcutKey = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

export type ShortcutAction =
  | "tool:pen"
  | "tool:eraser"
  | "tool:select"
  | "tool:pan"
  | "undo"
  | "redo"
  | "save"
  | string;

export type ShortcutCallback = () => void;

interface ShortcutBinding {
  key: ShortcutKey;
  action: ShortcutAction;
  callback: ShortcutCallback;
  description?: string;
}

export class Continuum_ShortcutManagerSystem {
  static shortcuts: Map<string, ShortcutBinding> = new Map();
  static defaultShortcuts: Record<ShortcutAction, ShortcutKey> = {
    "tool:pen": { key: "p" },
    "tool:eraser": { key: "e" },
    "tool:select": { key: "v" },
    "tool:pan": { key: "h" },
    undo: { key: "z", ctrl: true },
    redo: { key: "z", ctrl: true, shift: true },
    save: { key: "s", ctrl: true },
  };

  static isEnabled = true;

  static init() {
    window.addEventListener("keydown", Continuum_ShortcutManagerSystem.handleKeyDown);
  }

  static dispose() {
    window.removeEventListener("keydown", Continuum_ShortcutManagerSystem.handleKeyDown);
    Continuum_ShortcutManagerSystem.shortcuts.clear();
  }

  static enable() {
    Continuum_ShortcutManagerSystem.isEnabled = true;
  }

  static disable() {
    Continuum_ShortcutManagerSystem.isEnabled = false;
  }

    static handleKeyDown(e: KeyboardEvent) {
    if (!Continuum_ShortcutManagerSystem.isEnabled) return;
    
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return;
    }

    const shortcutKey = Continuum_ShortcutManagerSystem.keyEventToShortcutKey(e);
    const keyString = Continuum_ShortcutManagerSystem.shortcutKeyToString(shortcutKey);
    const binding = Continuum_ShortcutManagerSystem.shortcuts.get(keyString);

    if (binding) {
      e.preventDefault();
      binding.callback();
    }
  }


  static keyEventToShortcutKey(e: KeyboardEvent): ShortcutKey {
    return {
      key: e.key.toLowerCase(),
      ctrl: e.ctrlKey || e.metaKey, 
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey,
    };
  }

  static shortcutKeyToString(key: ShortcutKey): string {
    const parts: string[] = [];
    if (key.ctrl) parts.push('ctrl');
    if (key.shift) parts.push('shift');
    if (key.alt) parts.push('alt');
    parts.push(key.key);
    return parts.join('+');
  }


   static register(
    action: ShortcutAction,
    callback: ShortcutCallback,
    customKey?: ShortcutKey,
    description?: string
  ) {
    const key = customKey || Continuum_ShortcutManagerSystem.defaultShortcuts[action] || { key: '' };
    const keyString = Continuum_ShortcutManagerSystem.shortcutKeyToString(key);

    Continuum_ShortcutManagerSystem.shortcuts.set(keyString, {
      key,
      action,
      callback,
      description,
    });
  }

  static unregister(action: ShortcutAction) {
    const key = Continuum_ShortcutManagerSystem.defaultShortcuts[action];
    if (key) {
      const keyString = Continuum_ShortcutManagerSystem.shortcutKeyToString(key);
      Continuum_ShortcutManagerSystem.shortcuts.delete(keyString);
    }
  }


   static updateShortcut(action: ShortcutAction, newKey: ShortcutKey) {
    for (const [keyString, binding] of Continuum_ShortcutManagerSystem.shortcuts) {
      if (binding.action === action) {
        const callback = binding.callback;
        const description = binding.description;
        Continuum_ShortcutManagerSystem.shortcuts.delete(keyString);
        
        const newKeyString = Continuum_ShortcutManagerSystem.shortcutKeyToString(newKey);
        Continuum_ShortcutManagerSystem.shortcuts.set(newKeyString, {
          key: newKey,
          action,
          callback,
          description,
        });
        break;
      }
    }
  }

  static getShortcuts(): Map<ShortcutAction, ShortcutKey> {
    const result = new Map<ShortcutAction, ShortcutKey>();
    for (const binding of Continuum_ShortcutManagerSystem.shortcuts.values()) {
      result.set(binding.action, binding.key);
    }
    return result;
  }

  static getShortcutString(action: ShortcutAction): string {
    for (const binding of Continuum_ShortcutManagerSystem.shortcuts.values()) {
      if (binding.action === action) {
        const parts: string[] = [];
        if (binding.key.ctrl) parts.push('Ctrl');
        if (binding.key.shift) parts.push('Shift');
        if (binding.key.alt) parts.push('Alt');
        parts.push(binding.key.key.toUpperCase());
        return parts.join('+');
      }
    }
    return '';
  }
}
