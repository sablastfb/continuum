import {Button} from "primereact/button";
import {Link} from "react-router-dom";

function MainMenu() {
    return (
        <>
            <Button>
                <Link className="h-full w-full" to="/">Go to page one</Link>
            </Button>
        </>
    );
}

export default MainMenu;
