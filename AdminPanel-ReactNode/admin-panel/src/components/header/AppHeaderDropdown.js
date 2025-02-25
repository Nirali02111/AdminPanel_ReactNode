
import {
    CDropdown,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    cilSettings,
    cilUser,
    cilAccountLogout
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const AppHeaderDropdown = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate()
    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <CIcon icon={cilUser} className="me-2" size='lg' />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end" >
                <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                <CDropdownItem onClick={() => navigate('/profile')} className='pointer'>
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem onClick={() => navigate('/change-password')} className='pointer'>
                    <CIcon icon={cilSettings} className="me-2" />
                    Change Password
                </CDropdownItem>
                <CDropdownItem onClick={() => { logout(); navigate('/account/login') }} className='pointer'>
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
