import '../styles/Table.css';

import { useEffect, useState } from "react";
import api from '../components/Api';

const Table = (props: { type: string, edit: (row: string[]) => any}) => {
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<string[]>([]);

    const [sort, setSort] = useState<string>("");
    const [order, setOrder] = useState<string>("");

    const [search, setSearch] = useState<string>("");
    const [value, setValue] = useState<string>("");

    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);

    const availableSizes = [10, 25, 50, 100];

    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        const refreshHeaders = async () => {
            if (!props.type)
                return;

            const result = await api.findColumns(props.type);

            if (!result.state)
                return;

            setHeaders(result.data);

            if (result.data.length > 1)
                setSearch(result.data[1]);
        }

        refreshHeaders();
    }, [props.type]);

    useEffect(() => {
        const refreshRows = async () => {
            if (!props.type)
                return;

            const result = await api.findAll(props.type, search, value, sort, order, page, size);

            if (!result.state)
                return;

            setRows(result.data[0].map((row: any) => Object.values(row)));
            setTotal(result.data[1]);
            setRefresh(false);
        }

        refreshRows();
    }, [props.type, refresh, search, value, sort, order, page, size]);

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
        await api.delete(props.type, id);
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
                        <span>
                            {headers[i].charAt(0).toUpperCase() + headers[i].slice(1)}
                        </span>
                        {parseIcon(headers[i])}
                    </button>
                </th>
            );
        }

        html.push(
            <th key={headers.length} className="table-head-elem action">
                Actions
            </th>
        )

        return html;
    }

    const parseShowData = (data: any): JSX.Element => {
        if (data && typeof data === "object") {
            if ((data as any).name)
                return <>{(data as any).name}</>
            else
                return <>{JSON.stringify(data)}</>
        }

        return <>{data}</>;
    }

    const parseData = (): JSX.Element[] => {
        let html: JSX.Element[] = [];

        for (let i = 0; i < rows.length; i++) {
            let elems: JSX.Element[] = [];
            for (let j = 0; j < rows[i].length; j++) {
                elems.push(
                    <td key={j} className="table-body-elem">
                        {parseShowData(rows[i][j])}
                    </td>
                )
            }

            elems.push(
                <td key={rows[i].length} className="table-body-action">
                    <button onClick={() => (props.edit((rows[i] as unknown) as string[]))}>
                        <img className="table-body-icon" src="/icon/edit.svg" alt="Edit" />
                    </button>
                    <button onClick={() => deleteData(rows[i][0])}>
                        <img className="table-body-icon" src="/icon/delete.svg" alt="Delete" />
                    </button>
                </td>
            );

            html.push(<tr key={i} className="table-body-container">{elems}</tr>);
        }

        return html;
    }

    if (!props.type)
        return <div>Table type is not defined</div>;

    return (
        <>
            <div className="table-header">
                <select className="table-search" value={search} onChange={(e) => setSearch(e.target.value)}>
                    {headers.map((header, i) => <option key={i} value={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</option>).slice(1)}
                </select>
                <input className="table-search input" placeholder='Search' onChange={(e) => setValue(e.target.value)} />
            </div>

            {
                headers.length === 0 || rows.length === 0
                    ?
                    <div>Table is empty</div>
                    :
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
            }

            <div className="table-footer">

                <div className="table-paginator">
                    <button disabled={page <= 0} onClick={() => (setPage(page - 1))}>
                        <img src="/icon/arrow_left.svg" alt="<" />
                    </button>
                    <span>{page + 1}</span>
                    <button disabled={(page + 1) * size >= total} onClick={() => (setPage(page + 1))}>
                        <img src="/icon/arrow_right.svg" alt=">" />
                    </button>
                </div>

                <div className="table-total">
                    <span>Total: {total}</span>
                </div>

                <div className="table-size">
                    <span>{rows.length} / </span>
                    <select value={size} onChange={(e) => setSize(+e.target.value)}>
                        {availableSizes.map((size, i) => <option key={i} value={size}>{size}</option>)}
                    </select>
                </div>

            </div>
        </>

    )
};

export default Table;