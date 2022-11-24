import styles from '../../styles/Dashboard.module.css'
import HeaderDashboard from '../../src/layout/dashboard/Header'
import NavDashboard from '../../src/layout/dashboard/Nav'
import FooterDashboard from '../../src/layout/dashboard/Footer'
import AuthProvider from '../../src/components/AuthProvider'

export default function Dashboard({ children }) {

    return (
        <AuthProvider>
            <div className={styles.layout_dashboard}>
                <HeaderDashboard styles={styles} />
                <NavDashboard styles={styles} />
                <main>
                    {children}
                </main>
                <FooterDashboard styles={styles} />
            </div>
        </AuthProvider>
    )

}