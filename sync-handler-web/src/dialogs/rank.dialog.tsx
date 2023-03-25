import '../styles/Dialog.css';

import { useEffect, useState } from 'react';
import api from '../components/Api';
import { useModal } from '../contexts/modal.context';
import { Color } from '../enum/color.enum';
import { ResultInterface } from '../interfaces/result.interface';

const RankDialog = (props: { rank: string[] | null }) => {
    const [name, setName] = useState<string>("");
    const [prefix, setPrefix] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [chatColor, setChatColor] = useState<Color>(Color['§7']);

    const { unSetModal }: any = useModal();

    useEffect(() => {
        if (!props.rank || props.rank.length === 0)
            return;

        if (props.rank[1])
            setName(props.rank[1]);

        if (props.rank[2])
            setPrefix(props.rank[2]);

        if (props.rank[3])
            setSuffix(props.rank[3]);

        if (props.rank[4]) {
            const color = props.rank[4] as Color;
            setChatColor(Object.values(Color).find((c: Color) => c === color) as Color);
        }
    }, [props.rank]);

    const parseRank = (): any => {
        const rank: any = {};

        if (props.rank) {
            if (props.rank[1] !== name)
                rank['name'] = name;
            if (props.rank[2] !== prefix)
                rank['prefix'] = prefix;
            if (props.rank[3] !== suffix)
                rank['suffix'] = suffix;
            if (props.rank[4] !== chatColor)
                rank['chatColor'] = chatColor;
        } else {
            rank['name'] = name;
            rank['prefix'] = prefix;
            rank['suffix'] = suffix;
            rank['chatColor'] = chatColor;
        }

        return rank;
    }

    const submit = async (e: any) => {
        e.preventDefault();
        const rank: any = parseRank();

        if (props.rank) {
            if (Object.keys(rank).length === 0) {
                unSetModal();
                return;
            }

            const result: ResultInterface = await api.update('rank', props.rank[0], rank);
            result.state ? window.location.reload() : alert(result.data.response.data.message);
        } else {
            const result: ResultInterface = await api.create('rank', rank);
            result.state ? window.location.reload() : alert(result.data.response.data.message);
        }
    };

    return (
        <div className="dialog">

            {props.rank ? (
                <div className="header">
                    <span>Edit Rank</span>
                </div>
            ) : (
                <div className="header">
                    <span>Create Rank</span>
                </div>
            )}

            <form onSubmit={submit}>
                <input className="input" type="text" placeholder="Name" required={true} value={name} onChange={(e) => (setName(e.target.value))} />
                <input className="input" type="text" placeholder="Prefix" value={prefix} onChange={(e) => (setPrefix(e.target.value))} />
                <input className="input" type="text" placeholder="Suffix" value={suffix} onChange={(e) => (setSuffix(e.target.value))} />

                <select className="input" value={chatColor} onChange={(e) => (setChatColor(e.target.value as Color))}>
                    {Object.values(Color).map((color: Color) => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>

                <input className="input submit" type='submit' value={props.rank ? 'Edit' : 'Add'} />
                <input className="input cancel" type='button' value='Cancel' onClick={() => unSetModal()} />
            </form>
        </div>
    );
};

export default RankDialog;
