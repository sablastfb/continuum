import {KeyboardKey, MouseButton} from "../../data/store/KeyStore.ts";

export class InputUtils {
    public static normalizeKey(key: string): KeyboardKey {
        const keyMap: Record<string, KeyboardKey> = {
            'Meta': 'Control',
            ' ': 'Space',
        };
        return keyMap[key] ?? key.toLowerCase() as KeyboardKey;
    }

    public static hasMouseButton(buttonsMask: number, button: MouseButton): boolean {
        switch (button) {
            case "LEFT":
                return (buttonsMask & 1) !== 0;
            case "RIGHT":
                return (buttonsMask & 2) !== 0;
            case "MIDDLE":
                return (buttonsMask & 4) !== 0;
            default:
                return false;
        }
    }

    public static containKey(shortcut: string[], keysDown: string[]){
        if (shortcut.length !== keysDown.length) {
            return false;
        }

        // Sort and compare
        const sorted1 = [...shortcut].sort();
        const sorted2 = [...keysDown].sort();

        return sorted1.every((key, i) => key === sorted2[i]);
    }
}