import { useEffect, useState } from "react";
import api from "../components/Api";
import { useModal } from "../contexts/modal.context";
import { ResultInterface } from "../interfaces/result.interface";

const UserDialog = (props: { user: string[] | null }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { unSetModal }: any = useModal();

    useEffect(() => {
        if (!props.user || props.user.length === 0)
            return;

        if (props.user[1])
            setName(props.user[1]);

        if (props.user[2])
            setEmail(props.user[2]);
    }, [props.user]);

    const parseUser = (): any => {
        const user: any = {};

        if (props.user) {
            if (props.user[1] !== name)
                user['name'] = name;
            if (props.user[2] !== email)
                user['email'] = email;
            if (props.user[3] !== password && password !== "")
                user['password'] = password;
        } else {
            user['name'] = name;
            user['email'] = email;
            user['password'] = password;
        }

        return user;
    };

    const submit = async (e: any) => {
        e.preventDefault();
        const user: any = parseUser();

        if (props.user) {
            if (Object.keys(user).length === 0) {
                unSetModal();
                return;
            }

            const result: ResultInterface = await api.update('user', props.user[0], user);
            result.state ? window.location.reload() : alert(result.data.response.data.message);
        } else {
            const result: ResultInterface = await api.create('user', user);
            result.state ? window.location.reload() : alert(result.data.response.data.message);
        }
    };

    return (
        <div className="dialog">

            {props.user ? (
                <div className="header">
                    <span>Edit User</span>
                </div>
            ) : (
                <div className="header">
                    <span>Create User</span>
                </div>
            )}

            <form onSubmit={submit}>
                <input className="input" type="text" placeholder="Name" required={true} value={name} onChange={(e) => (setName(e.target.value))} />
                <input className="input" type="email" placeholder="Email" required={true} value={email} onChange={(e) => (setEmail(e.target.value))} />
                <input className="input" type="password" placeholder="Password" required={!props.user} value={password} onChange={(e) => (setPassword(e.target.value))} />

                <input className="input submit" type='submit' value={!!props.user ? 'Edit' : 'Add'} />
                <input className="input cancel" type='button' value='Cancel' onClick={() => unSetModal()} />
            </form>
        </div>
    );
}



export default UserDialog;