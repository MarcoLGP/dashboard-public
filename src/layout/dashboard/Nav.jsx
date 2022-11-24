import { Avatar } from '@nextui-org/react'
import React from 'react'
import { HiHome, HiOutlineHome, HiOutlineUsers } from 'react-icons/hi'
import NavItem from '../../components/dashboard/NavItem'
import { BiLogOut } from 'react-icons/bi'
import { MdOutlineMessage } from 'react-icons/md'
import { useRouter } from 'next/router'
import { RiUser3Fill, RiUser3Line, RiGithubFill } from 'react-icons/ri'
import ModalConfirmExit from '../../components/modals/ModalConfirmExit'
import ModalWriteComment from '../../components/modals/ModalWriteComment'
import Link from 'next/link'
import ModalSearchUsers from '../../components/modals/ModalSearchUsers'
import { useSelector } from 'react-redux'

export default function NavDashboard({ styles }) {

    const [visibleExitModal, setVisibleExitModal] = React.useState(false)
    const [visibleSearchUsersModal, setVisibleSearchUsersModal] = React.useState(false)
    const [visibleModalWriteComment, setVisibleModalWriteComment] = React.useState(false)
    const { userInfo } = useSelector(state => state.userInfo)
    const { asPath, push } = useRouter()

    return (
        <nav>
            {visibleModalWriteComment && <ModalWriteComment styles={styles} React={React} usernameUser={userInfo.Username} visibleModalWriteComment={visibleModalWriteComment} setVisibleModalWriteComment={setVisibleModalWriteComment} />}
            {visibleExitModal && <ModalConfirmExit push={push} setVisibleExitModal={setVisibleExitModal} visibleExitModal={visibleExitModal} />}
            {visibleSearchUsersModal && <ModalSearchUsers React={React} styles={styles} visibleSearchUsersModal={visibleSearchUsersModal} setVisibleSearchUsersModal={setVisibleSearchUsersModal} />}
            <Link href={`/dashboard/profile/${userInfo.Username}`}>
                <Avatar src={userInfo.Img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} className={`${styles.avatar_user} move_effect`} css={{ size: '$17' }} />
            </Link>
            <div className={styles.nav_middle_icons}>
                <NavItem href='/dashboard/home' backgroundColor={asPath.includes('/dashboard/home')}>
                    {asPath.includes('/dashboard/home') ? <HiHome size={22} /> : <HiOutlineHome size={22} />}
                </NavItem>
                <NavItem href={`/dashboard/profile/${userInfo.Username}`} backgroundColor={asPath.includes('/dashboard/profile')}>
                    {asPath.includes('/dashboard/profile') ? <RiUser3Fill size={22} /> : <RiUser3Line size={22} />}
                </NavItem>
                <NavItem href={'#'} onClick={() => setVisibleSearchUsersModal(true)}>
                    <HiOutlineUsers size={22} />
                </NavItem>
                <NavItem href={'#'} onClick={() => setVisibleModalWriteComment(true)}>
                    <MdOutlineMessage size={22} />
                </NavItem>
                <NavItem href={'#'} onClick={() => setVisibleExitModal(true)}>
                    <BiLogOut size={24} />
                </NavItem>
            </div>
            <div className={styles.nav_bottom_icons}>
                <NavItem targetBlank href={'https://github.com/MarcoLGP'}>
                    <RiGithubFill size={24} />
                </NavItem>
            </div>
        </nav>
    )

}