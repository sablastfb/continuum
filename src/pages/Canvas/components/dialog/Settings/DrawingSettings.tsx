function DrawingSettings() {
  return (
    <div className="p-4">
      <h3 className="text-xl text-white mb-4">Pencil Settings</h3>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-white mb-2">Pencil Color</label>
          <input type="color" className="w-20 h-10" />
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-2">Pencil Width</label>
          <input type="range" min="1" max="20" defaultValue="5" className="w-full" />
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-2">Opacity</label>
          <input type="range" min="0" max="100" defaultValue="100" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default DrawingSettings;
