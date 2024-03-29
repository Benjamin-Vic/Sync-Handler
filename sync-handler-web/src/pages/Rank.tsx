import '../styles/Elem.css';

import Table from '../components/Table';
import { useModal } from '../contexts/modal.context';
import RankDialog from '../dialogs/rank.dialog';

const Rank = () => {
    const { setModal }: any = useModal();

    return (
        <div className="elem">
            <div className="container-left">
                <span className="title">Rank</span>
                <div className="space" />
                <button onClick={() => setModal(<RankDialog rank={null} />)}>
                    <img src="/icon/add.svg" alt="add" />
                </button>
            </div>
            <div className="container-right">
                <Table type="rank" edit={(row: string[]) => setModal(<RankDialog rank={row} />)} />
            </div>
        </div>
    );
};

export default Rank;
