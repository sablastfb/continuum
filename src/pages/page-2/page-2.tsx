import { Button } from "primereact/button";
import { Link } from "react-router-dom";

function Page2() {
  return (
    <>
      <div>Page 2</div>
        <Button >
        <Link to="/">Go to page one</Link>
      </Button>
    </>
  );
}

export default Page2;
