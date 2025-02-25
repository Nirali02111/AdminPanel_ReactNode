import { useContext } from 'react'
import {
    CContainer,
    CHeader,
    CHeaderNav,
    CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { LayoutContext } from '../context/LayoutContext'

const AppHeader = () => {
    const { toggleSidebar } = useContext(LayoutContext)

    return (
        <CHeader position="sticky">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={toggleSidebar}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderNav className="ms-3">
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
        </CHeader>
    )
}

export default AppHeader
