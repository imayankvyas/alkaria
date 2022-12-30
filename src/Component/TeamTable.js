import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import "../App.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TeamInfo from "./TeamInfo";


// Custom style for Data Table
const customStyles = {
    headCells: {
        style: {
            backgroundColor: "#004589",
            color: "#FFF",
            fontWeight: "600 !important",
        },
    },
    rows: {
        style: {
            borderBottomWidth: "0 !important",

        },
    },
    cells: {
        style: {
            color: "#000",
            fontWeight: "600 !important",
        },
    },
    selectedHighlightStyle: {
        style: {
            color: "red",
            backgroundColor: "black",
            borderBottomColor: "yellow",
        },
    },
    highlightOnHoverStyle: {
        backgroundColor: '#aeb0b1'
    },
    pagination: {
        style: {
            color: '#004589'
        },
        pageButtonsStyle: {
            color: '#004589'
        },
    },
    selectedHighlightStyle: {
        // use nth-of-type(n) to override other nth selectors
        '&:nth-of-type(n)': {
            backgroundColor: '#aeb0b1'
        },
    }
};

// Column for Data Table
const columns = [
    {
        name: "Team Name",
        selector: (row) => row?.name,
    },
    {
        name: "City",
        selector: (row) => row?.city,
        sortable: true,
    },
    {
        name: "Abbreviation",
        selector: (row) => row?.abbreviation,
    },
    {
        name: "Conference",
        selector: (row) => row?.conference,
    },
    {
        name: "Division",
        selector: (row) => row?.division,
    },
];


const TeamTable = ({ searchTeam }) => {
    const [team, setTeam] = useState([]);
    const [teamDetail, setTeamDetail] = useState();
    const [viewTeam, setViewTeam] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null);

    // API call effect
    useEffect(() => {
        axios.get("https://www.balldontlie.io/api/v1/teams").then((response) => {
            setTeam(response?.data);
            setError(null);
            setFetching(false)
        })
            .catch(setError);
    }, []);

    // Searching team Logic

    const searchResult = useMemo(() =>
        team?.data?.filter((teamData) => (
            teamData.name.toString()
                .toLowerCase() == searchTeam
        )), [searchTeam]

    )


    return (
        <Fragment>
            {fetching ? <Skeleton count={10} /> :
                <>
                    <DataTable
                        columns={columns}
                        data={searchResult && searchResult?.length ? searchResult : team.data}
                        customStyles={customStyles}
                        progressComponent={<Skeleton count={7} />}
                        progressPending={fetching}
                        onRowClicked={(row) => { setViewTeam(true); setTeamDetail(row) }}
                        pagination
                        pointerOnHover
                        responsive
                        highlightOnHover


                    />
                    {viewTeam ? <TeamInfo teamDetail={teamDetail} setTeamDetail={setTeamDetail} viewTeam={viewTeam} setViewTeam={setViewTeam} /> : null}
                </>
            }

        </Fragment>
    );
};


export default TeamTable;