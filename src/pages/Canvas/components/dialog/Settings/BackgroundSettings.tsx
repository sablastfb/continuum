function BackgroundSettings() {
  return (
    <div className="p-4">
      <h3 className="text-xl text-white mb-4">Background Settings</h3>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-white mb-2">Background Color</label>
          <input type="color" className="w-20 h-10" />
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-2">Background Image</label>
          <input type="file" accept="image/*" className="text-white" />
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-2">Opacity</label>
          <input type="range" min="0" max="100" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default BackgroundSettings;
