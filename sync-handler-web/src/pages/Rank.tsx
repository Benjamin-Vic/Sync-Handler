import '../styles/Rank.css';
import Table from '../components/Table';

const Rank = () => {
    return (
        <div className="rank">
            <div className="container-left">
                <span className="title">Rank</span>

                <div className="space" />

            </div>
            <div className="container-right">
                <Table type="rank" />

            </div>

        </div>
    );
};

export default Rank;
