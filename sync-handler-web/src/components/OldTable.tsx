import "../styles/OldTable.css"

const TableOld = (props: any): JSX.Element => {
    const parseHeaders = (): JSX.Element[] => {
        let html: JSX.Element[] = [];

        for (let i = 0; i < props.data.headers.length; i++) {
            html.push(<th key={i} className="table-head-elem">{props.data.headers[i]}</th>);
        }

        return html;
    }

    const parseData = (): JSX.Element[] => {
        let html: JSX.Element[] = [];

        for (let i = 0; i < props.data.rows.length; i++) {
            let elems: JSX.Element[] = [];
            for (let j = 0; j < props.data.rows[i].length; j++) {
                elems.push(<td key={j} className="table-body-elem">{props.data.rows[i][j]}</td>)
            }
            html.push(<tr key={i} className="table-body-container">{elems}</tr>);
        }

        return html;
    }

    const generateTable = (): JSX.Element => {
        if (!props.data || !props.data.headers || !props.data.rows || props.data.headers.length === 0 || props.data.rows.length === 0) {
            return <div>Table is empty</div>;
        }

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
        );
    }

    return generateTable();
}

export default TableOld;