import React, { useCallback, useEffect, useState } from 'react'

const ModalContext = React.createContext({});

const Modal = ({ modal, unSetModal }: any) => {
    useEffect(() => {
        const bind = (e: any) => {
            if (e.keyCode !== 27) {
                return;
            }

            if (document.activeElement && ['INPUT', 'SELECT'].includes(document.activeElement.tagName)) {
                return;
            }

            unSetModal();
        }

        document.addEventListener('keyup', bind);
        return () => document.removeEventListener('keyup', bind);
    }, [modal, unSetModal]);

    return (
        <>
            <div className="modal-background" onClick={() => unSetModal()} />
            <div className="modal-content">
                {modal}
            </div>
        </>
    );
};

const ModalProvider = (props: any) => {
    const [modal, setModal] = useState(null);
    const unSetModal = useCallback(() => { setModal(null); }, [setModal]);

    return (
        <ModalContext.Provider value={{ unSetModal, setModal }} {...props} >
            {props.children}
            {modal && <Modal modal={modal} unSetModal={unSetModal} />}
        </ModalContext.Provider>
    );
};

const useModal = () => {
    const context = React.useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a UserProvider');
    }

    return context;
}

export { ModalProvider, useModal };
