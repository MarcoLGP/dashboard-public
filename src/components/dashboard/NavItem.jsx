import styles from '../../../styles/Dashboard.module.css'
import NextLink from 'next/link'

export default function NavItem({ children, backgroundColor, onClick, href, targetBlank }) {

    return (
        <NextLink href={href}>
            <a target={targetBlank ? '_blank' : '_self'}>
                <div onClick={onClick} className={`${styles.nav_item} move_effect ${backgroundColor && styles.background_nav_item}`}>
                {children}
            </div>
            </a>
        </NextLink>
    )

}