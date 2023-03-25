import '../styles/Dialog.css';

import { useEffect, useState } from 'react';
import { useModal } from '../contexts/modal.context';
import api from '../components/Api';
import { ResultInterface } from '../interfaces/result.interface';

const PlayerDialog = (props: { player: string[] | null }) => {
    const [uuid, setUuid] = useState<string>("");
    const [rank, setRank] = useState<number>(-1);
    const [ranks, setRanks] = useState<any[]>([]);

    const { unSetModal }: any = useModal();

    useEffect(() => {
        api.findAll('rank').then((res: ResultInterface) => {
            if (res.state)
                setRanks(res.data[0]);
        });

        if (!props.player || props.player.length === 0)
            return;

        if (props.player[1])
            setUuid(props.player[1]);

        if (props.player[2])
            setRank((props.player[2] as any).id);
    }, [props.player]);

    const parsePlayer = (): any => {
        const player: any = {};

        if (props.player) {
            if (props.player[1] !== uuid)
                player['uuid'] = uuid;
            if (!props.player[2] || (props.player[2] as any).id !== rank)
                player['rank'] = rank === -1 ? null : rank;
        } else {
            player['uuid'] = uuid;
            player['rank'] = rank === -1 ? null : rank;
        }

        return player;
    }

    const submit = async (e: any) => {
        e.preventDefault();
        const player: any = parsePlayer();

        if (props.player) {
            if (Object.keys(player).length === 0) {
                unSetModal();
                return;
            }

            const result: ResultInterface = await api.update('player', props.player[0], player);
            result.state ? window.location.reload() : alert(result.data.response.data.message);
        } else {
            const result: ResultInterface = await api.create('player', player);
            result.state ? window.location.reload() : alert(result.data.response.data.message);
        }
    }

    return (
        <div className="dialog">

            {props.player ? (
                <div className="header">
                    <span>Edit Player</span>
                </div>
            ) : (
                <div className="header">
                    <span>Create Player</span>
                </div>
            )}

            <form onSubmit={submit}>
                <input className="input" disabled={!!props.player} type="text" placeholder="Uuid" required={true} value={uuid} onChange={(e) => (setUuid(e.target.value))} />

                <select className="input" value={rank} onChange={(e) => (setRank(+e.target.value))}>
                    <option value={-1}>Default</option>
                    {ranks.map((rank: any) => (
                        <option key={rank.id} value={rank.id}>{rank.name}</option>
                    ))}
                </select>

                <input className="input submit" type='submit' value={props.player ? 'Edit' : 'Add'} />
                <input className="input cancel" type='button' value='Cancel' onClick={() => unSetModal()} />
            </form>
        </div>
    );
};

export default PlayerDialog;
