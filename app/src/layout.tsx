import { Outlet, useNavigation } from "react-router";
import { Spinner } from "./components/spinner";

export default () => {

    return (
    <div>
        <Outlet />
    </div>
    );
}