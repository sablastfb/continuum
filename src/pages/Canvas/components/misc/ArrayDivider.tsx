import { Direction } from "../../data/store/LayoutStore";

export type DividerParameters = {
  direction: Direction;
};

const ArrayDivider = ({
  direction: orjentation = "vertical",
}: DividerParameters) => {
  if (orjentation === "vertical") {
    return (
      <>
        <div className="w-full">
          <div className="w-full h-0.5 bg-gray-200 "></div>
        </div>
      </>
    );
  } else {
       return (
      <>
        <div className="h-full">
        <div className="h-full w-0.5 bg-gray-200 " />;
        </div>
      </>
    );
  }
};

export default ArrayDivider;
