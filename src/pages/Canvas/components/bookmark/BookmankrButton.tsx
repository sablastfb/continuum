import { Bookmark } from "lucide-react";
import { defaultIconSize } from "../../data/constants/CanvasConstants";
import { useBookmark } from "../../data/store/BookmarkStore";

function BookmankrButton() {
  const visible = useBookmark().containerVisible;
  const setVisible = useBookmark().setContainerVisible;

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className="cursor-pointer"
      >
        <Bookmark
          size={defaultIconSize}
          className={`${visible && `fill-amber-300`} `}
        />
      </div>
    </>
  );
}

export default BookmankrButton;
