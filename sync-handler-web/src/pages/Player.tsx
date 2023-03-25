import '../styles/Elem.css';

import Table from '../components/Table';
import { useModal } from '../contexts/modal.context';
import PlayerDialog from '../dialogs/player.dialog';

const Player = () => {
    const { setModal }: any = useModal();

    return (
        <div className="elem">
            <div className="container-left">
                <span className="title">Player</span>
                <div className="space" />
                <button onClick={() => setModal(<PlayerDialog player={null} />)}>
                    <img src="/icon/add.svg" alt="add" />
                </button>
            </div>
            <div className="container-right">
                <Table type="player" edit={(row: string[]) => setModal(<PlayerDialog player={row} />) } />
            </div>
        </div>
    );
}

export default Player;