import React, { useState } from 'react';
import { ChevronDown, Box, BarChart3, Settings, Image, LucideIcon } from 'lucide-react';

// Type definitions
interface Editor {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

// Example components that can be switched between
function ViewportComponent() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-800 text-white">
      <div className="text-center">
        <Box className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">3D Viewport</h2>
        <p className="text-gray-400 mt-2">Your 3D scene goes here</p>
      </div>
    </div>
  );
}

function GraphComponent() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Graph Editor</h2>
        <p className="text-gray-400 mt-2">Animation curves and data</p>
      </div>
    </div>
  );
}

function PropertiesComponent() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-700 text-white">
      <div className="text-center">
        <Settings className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Properties Panel</h2>
        <p className="text-gray-400 mt-2">Object properties and settings</p>
      </div>
    </div>
  );
}

function ImageEditorComponent() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-600 text-white">
      <div className="text-center">
        <Image className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Image Editor</h2>
        <p className="text-gray-400 mt-2">UV and texture editing</p>
      </div>
    </div>
  );
}

// Main root component with dropdown switcher
function EditorRoot() {
  const [activeEditor, setActiveEditor] = useState<string>('viewport');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const editors: Editor[] = [
    { id: 'viewport', name: '3D Viewport', icon: Box, component: ViewportComponent },
    { id: 'graph', name: 'Graph Editor', icon: BarChart3, component: GraphComponent },
    { id: 'properties', name: 'Properties', icon: Settings, component: PropertiesComponent },
    { id: 'image', name: 'Image Editor', icon: Image, component: ImageEditorComponent }
  ];

  const currentEditor = editors.find(e => e.id === activeEditor);
  if (!currentEditor) return null;
  
  const ActiveComponent = currentEditor.component;
  const ActiveIcon = currentEditor.icon;

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900">
      {/* Header with dropdown */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            <ActiveIcon className="w-4 h-4" />
            <span>{currentEditor.name}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 min-w-[200px]">
              {editors.map((editor: Editor) => {
                const Icon = editor.icon;
                return (
                  <button
                    key={editor.id}
                    onClick={() => {
                      setActiveEditor(editor.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left text-white hover:bg-gray-600 transition-colors ${
                      editor.id === activeEditor ? 'bg-gray-600' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{editor.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="ml-auto text-gray-400 text-xs">
          Editor Switcher
        </div>
      </div>

      {/* Active component area */}
      <ActiveComponent />
    </div>
  );
}

export default EditorRoot;