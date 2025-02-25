import React from 'react';
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react';

interface ConfirmationPopupProps {
    message: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ message, isOpen, onConfirm, onCancel }) => {

    return (
        <CModal visible={isOpen} onClose={onCancel}> {/* Adjust 'visible' prop */}
            <CModalBody>{message}</CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onCancel}>
                    Cancel
                </CButton>
                <CButton color="primary" onClick={onConfirm}>
                    Confirm
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default ConfirmationPopup;
