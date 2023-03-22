import '../styles/Layout.css'

import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import api from './Api';

const Layout = () => {
    const [sidenav, setSidenav] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        getProfile();
    }, []);

    const nav: any = [
        { name: "Rank", href: "/rank" },
        { name: "Player", href: "/player" },
        { name: "Permission", href: "/permission" },
        { name: "User", href: "/user" },
    ];

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles: any = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: {
            opacity: 0,
            visibility: "hidden"
        }
    };

    const toggleSidenav = () => {
        setSidenav(!sidenav)
    };

    const getProfile = async () => {
        if (!(await api.find('user', '-1')).state) {
            document.cookie = "access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/";
        }
    };

    const compileNav = () => {
        return nav.map((item: any, index: number) => (
            <a href={item.href} key={index}>
                {item.name}
            </a>
        ));
    };

    const compileSidenav = (): JSX.Element => {
        return (
            <Transition nodeRef={nodeRef} in={sidenav} timeout={duration}>
                {state => (
                    <div ref={nodeRef} style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        <div className="sidenav">
                            {compileNav()}
                        </div>
                    </div>
                )}
            </Transition>
        );
    }

    return (
        <>
            <div className="layout">
                <div className="container app">
                    <a href="/">Sync-Handler</a>
                </div>
                <div className="container desktop">
                    {compileNav()}
                </div>
                <div className="container mobile">
                    <button onClick={toggleSidenav}>
                        <img src="/icon/menu.svg" alt="menu" />
                    </button>
                    {compileSidenav()}
                </div>
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout;
