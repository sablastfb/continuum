import CircleColorPicker from "../misc/CircleColorPicker";

function EraseTools() {
  return (
    <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2 pointer-events-none">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-2  min-w-min pointer-events-auto">
          <CircleColorPicker colorId="#1099bb" colorKey={1} />
        </div>
      </div>
    </>
  );
}

export default EraseTools;
