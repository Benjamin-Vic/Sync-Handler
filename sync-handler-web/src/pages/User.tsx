import '../styles/Elem.css';

import Table from '../components/Table';
import { useModal } from '../contexts/modal.context';
import UserDialog from '../dialogs/user.dialog';

const User = () => {
    const { setModal }: any = useModal();

    return (
        <div className="elem">
            <div className="container-left">
                <span className="title">User</span>
                <div className="space" />
                <button onClick={() => setModal(<UserDialog user={null} />)}>
                    <img src="/icon/add.svg" alt="add" />
                </button>
            </div>
            <div className="container-right">
                <Table type="user" edit={(row: string[]) => setModal(<UserDialog user={row} />)} />
            </div>
        </div>
    );
};

export default User;
