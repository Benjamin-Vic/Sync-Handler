import '../styles/Table.css';

import { useEffect, useState } from "react";
import api from '../components/Api';

const Table = (props: any) => {
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<string[]>([]);

    const [sort, setSort] = useState<string>("");
    const [order, setOrder] = useState<string>("");

    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        const refreshData = async () => {
            if (!props.type)
                return;

            console.log("refresh data")

            setHeaders((await api.findColumns(props.type)).data);
            setRows((await api.findAll(props.type, sort, order)).data.map((row: any) => Object.values(row)));
            setRefresh(false);
        }

        refreshData();
    }, [props.type, refresh, sort, order]);

    const sortData = (header: string) => {
        if (sort === header) {
            if (order === "ASC") {
                setOrder("DESC");
            } else {
                setOrder("");
                setSort("");
            }
        } else {
            setOrder("ASC");
            setSort(header);
        }
    }

    const deleteData = async (id: string) => {
        console.log("delete data")
        await api.delete(props.type, id);
        console.log("deleted data")
        setRefresh(true);
    }

    const parseIcon = (header: string): JSX.Element => {
        if (header === sort) {
            if (order === "ASC")
                return <img className="table-head-icon" src="/icon/arrow_up.svg" alt="ASC" />
            else if (order === "DESC")
                return <img className="table-head-icon" src="/icon/arrow_down.svg" alt="DESC" />
        }
        return <div className="table-head-icon"></div>
    }

    const parseHeaders = (): JSX.Element[] => {
        let html: JSX.Element[] = [];

        for (let i = 0; i < headers.length; i++) {
            html.push(
                <th key={i} className="table-head-elem">
                    <button onClick={() => sortData(headers[i])}>
                        {headers[i].charAt(0).toUpperCase() + headers[i].slice(1)}
                        {parseIcon(headers[i])}
                    </button>
                </th>
            );
        }

        html.push(
            <th key={headers.length} className="table-head-elem">
                Actions
            </th>
        )

        return html;
    }

    const parseData = (): JSX.Element[] => {
        let html: JSX.Element[] = [];

        for (let i = 0; i < rows.length; i++) {
            let elems: JSX.Element[] = [];
            for (let j = 0; j < rows[i].length; j++) {
                elems.push(<td key={j} className="table-body-elem">{rows[i][j]}</td>)
            }

            elems.push(
                <td key={rows[i].length} className="table-body-action">
                    <button onClick={() => deleteData(rows[i][0])}>
                        <img className="table-body-icon" src="/icon/delete.svg" alt="Delete" />
                    </button>
                    <button onClick={() => props.onEdit(rows[i])}>
                        <img className="table-body-icon" src="/icon/edit.svg" alt="Edit" />
                    </button>
                </td>
            );

            html.push(<tr key={i} className="table-body-container">{elems}</tr>);
        }

        return html;
    }

    if (!props.type)
        return <div>Table type is not defined</div>;

    if (headers.length === 0 || rows.length === 0)
        return <div>Table is empty</div>;

    return (
        <table className="table">
            <thead className="table-head">
                <tr>
                    {parseHeaders()}
                </tr>
            </thead>
            <tbody className="table-body">
                {parseData()}
            </tbody>
        </table>
    )
};

export default Table;