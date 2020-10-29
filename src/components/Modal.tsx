import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
    show: boolean;
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    shouldCloseOnOverlayClick?: boolean;
    overlayBackgroundColor?: string;
    contentBackgroundColor?: string; // header
    bodyBackgroundColor?: string;
    title?: string;
    removeVerticalSpacing?: boolean;
    children: React.ReactNode;
    onClose: () => void;
    disableOnClose?: boolean;
};

const Modal: React.FC<ModalProps> = (props: ModalProps) => {

    const customStyles = {
        overlay: {
            backgroundColor: props.overlayBackgroundColor ?? 'rgba(0, 0, 0, .8)',
            zIndex: 9999,
        },
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            transform             : 'translate(-50%, -50%)',
            minWidth              : props.minWidth ?? '60vw',
            width                 : props.width ?? "auto",
            maxWidth              : props.maxWidth ?? '100vw',
            border                : 'none',
            backgroundColor       : props.contentBackgroundColor ?? 'white',
            maxHeight             : '100vh',
            overflow              : 'auto',
        },
    };

    const [modalIsOpen, setIsOpen] = useState<boolean>(props.show);

    useEffect(() => {
        setIsOpen(props.show);
    }, [props.show]);

    const _renderHeader = () => {

        return(
            <div>
                <div className="d-flex align-items-center px-3 py-2">
                    <span className="font-weight-bold">{props.title ?? ""}</span>
                    <div 
                        className="ml-auto cursor-pointer p-2"
                        onClick={() => {
                            if(props.disableOnClose) return;
                            props.onClose();
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faTimes}
                        />
                    </div>
                </div>
                <hr className="m-0" />
            </div>
        );

    }

    let removeVerticalSpacing: boolean = props.removeVerticalSpacing ?? false;
    let bodyBackgroundColorStr: string = props.bodyBackgroundColor ?? "white";

    ReactModal.setAppElement('#root');

    return(
        <>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => props.onClose()}
                style={customStyles}
                shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick ?? false}
            >
                {_renderHeader()}
                <div className={`${removeVerticalSpacing ? "px-3 py-0" : "p-3"}`} style={{ backgroundColor: bodyBackgroundColorStr }}>
                    {props.children}
                </div>
            </ReactModal>
        </>
    );

};

export default React.memo(Modal);
