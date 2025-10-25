import React, { useRef, useState } from 'react';
import { DockviewReact, DockviewApi, IDockviewPanelProps } from 'dockview';
import 'dockview-core/dist/styles/dockview.css';
// TODO REMOVE
// Hello component with split buttons
const HelloPanel = (props: IDockviewPanelProps<{ panelId: string; onSplit: (direction: string) => void; showSplitButtons: boolean }>) => {
  const { panelId, onSplit, showSplitButtons } = props.params;

  return (
    <div style={{ 
   
    }}>
      <h2>Hello from Panel {panelId}</h2>
      <p>This is a resizable panel</p>
      <div style={{ marginTop: '10px' }}>
        <input 
          type="text" 
          placeholder="Type something..." 
          style={{ padding: '8px', width: '200px' }}
        />
      </div>

      {/* Split buttons overlay */}
      {showSplitButtons && (
        <>
          {/* Top button */}
          <button
            onClick={() => onSplit('above')}
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '12px 24px',
              cursor: 'pointer',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 1000
            }}
          >
            ⬆️ Split Top
          </button>

          {/* Right button */}
          <button
            onClick={() => onSplit('right')}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '12px 24px',
              cursor: 'pointer',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 1000
            }}
          >
            ➡️ Split Right
          </button>

          {/* Bottom button */}
          <button
            onClick={() => onSplit('below')}
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '12px 24px',
              cursor: 'pointer',
              background: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 1000
            }}
          >
            ⬇️ Split Bottom
          </button>

          {/* Left button */}
          <button
            onClick={() => onSplit('left')}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '12px 24px',
              cursor: 'pointer',
              background: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 1000
            }}
          >
            ⬅️ Split Left
          </button>
        </>
      )}
    </div>
  );
};

export const MyDockviewLayout = () => {
  const apiRef = useRef<DockviewApi | null>(null);
  const [panelCount, setPanelCount] = useState(0);
  const [savedLayout, setSavedLayout] = useState<any>(null);
  const [showSplitMode, setShowSplitMode] = useState(false);

  const components = {
    hello:  HelloPanel
  };

  // Toggle split mode (show/hide split buttons on all panels)
  const toggleSplitMode = () => {
    if (!apiRef.current) return;
    
    const newMode = !showSplitMode;
    setShowSplitMode(newMode);

    // Update all panels to show/hide split buttons
    apiRef.current.panels.forEach(panel => {
      panel.api.updateParameters({
        ...panel.params,
        showSplitButtons: newMode
      });
    });
  };

  // Handle split action from a panel
  const handleSplit = (panelId: string, direction: 'above' | 'below' | 'left' | 'right') => {
    if (!apiRef.current) return;
    const newPanelId = `panel_${panelCount+Math.random()}`;
    setPanelCount(panelCount + 1);

    const c = apiRef.current.addPanel({
      id: newPanelId,
      component: 'hello',
      params: { 
        panelId: newPanelId,
        onSplit: (dir: string) => handleSplit(newPanelId, dir as any),
        showSplitButtons: showSplitMode
      },
      position: { referencePanel: panelId, direction },
    });
    
          c.group.header.hidden = true;

    // Turn off split mode after splitting
    setShowSplitMode(false);
    apiRef.current.panels.forEach(panel => {
      panel.api.updateParameters({
        ...panel.params,
        showSplitButtons: false
      });
    });
  };

  // Remove the active panel
  const removePanel = () => {
    if (!apiRef.current) return;
    
    const activePanel = apiRef.current.activePanel;
    if (!activePanel) {
      alert('No active panel to remove. Click on a panel first.');
      return;
    }

    apiRef.current.removePanel(activePanel);
  };

  // Save the current layout
  const saveLayout = () => {
    if (!apiRef.current) return;
    
    const layout = apiRef.current.toJSON();
    setSavedLayout(layout);
    alert('Layout saved!');
    console.log('Saved layout:', layout);
  };

  // Load the saved layout
  const loadLayout = () => {
    if (!apiRef.current || !savedLayout) {
      alert('No saved layout found!');
      return;
    }

    apiRef.current.fromJSON(savedLayout);
    alert('Layout loaded!');
  };

  // Clear all panels
  const clearAll = () => {
    if (!apiRef.current) return;
    
    apiRef.current.clear();
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      {/* Control buttons */}
      <div style={{ 
        padding: '10px', 
        background: '#333', 
        color: 'white',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={toggleSplitMode}
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer',
            background: showSplitMode ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            fontWeight: showSplitMode ? 'bold' : 'normal'
          }}
        >
          {showSplitMode ? '✅ Split Mode ON' : '➕ Add Panel'}
        </button>
        <button 
          onClick={removePanel}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          ❌ Remove Panel
        </button>
        <button 
          onClick={saveLayout}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          💾 Save Layout
        </button>
        <button 
          onClick={loadLayout}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
          disabled={!savedLayout}
        >
          📂 Load Layout
        </button>
        <button 
          onClick={clearAll}
          style={{ padding: '8px 16px', cursor: 'pointer', background: '#d32f2f', color: 'white', border: 'none' }}
        >
          🗑️ Clear All
        </button>
      </div>

      {/* Dockview container */}
      <div style={{ flex: 1 }}>
        <DockviewReact
          components={components}
          hideBorders={false}
          
          disableFloatingGroups={true}
          watermarkComponent={() => null}
          onReady={(event) => {
            apiRef.current = event.api;
 
            event.api.addPanel({
              id: 'panel_0',
              component: 'hello',
              params: { 
                panelId: 'panel_0',
                onSplit: (dir: string) => handleSplit('panel_0', dir as any),
                showSplitButtons: false
              },
              
            });

            setPanelCount(1);
          }}
          className="dockview-theme-light"
        />
      </div>

      <style>{`
        .dockview-theme-light .tabs-and-actions-container,
        .dockview-theme-light .tabs-container,
        .dockview-theme-light .tab,
        .dockview-theme-light .dv-default-tab {
          display: none !important;
          height: 0 !important;
          min-height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .dockview-theme-light .content-container {
          top: 0 !important;
        }
        
        .dockview-theme-light .groupview {
          padding-top: 0 !important;
        }
      `}</style>
    </div>
  );
};