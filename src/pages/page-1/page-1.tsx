import { Button } from "primereact/button";
import { Link } from "react-router-dom";

function Page1() {
  return (
    <>
      <div>Page 1</div>
      <Button >
        <Link to="/page-two">Go to page two</Link>
      </Button>
    </>
  );
}

export default Page1;
