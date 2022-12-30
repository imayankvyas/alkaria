import { Fragment, useState } from "react";
import { Container } from "reactstrap";
import TeamTable from "./Component/TeamTable";
import "./App.css"
import { useDebounce } from "use-debounce";
import Search from "./Component/Search";
const Nba = () => {

    const [search, setSearch] = useState()
    const [searchTeam] = useDebounce(search, 200);

    return (
        <Fragment>
            <Container>
                <h5 className="d-flex flex-start text-capital my-3">NBA TEAMS</h5>
                <Search search={search} setSearch={setSearch} />
                {/* Team Details */}
                <TeamTable searchTeam={searchTeam} />

            </Container>
        </Fragment>
    );
};
export default Nba;
