export default function MainDashboard({ styles, children }) {

    return (
        <div className={styles.flex_row}>
            <div className={styles.content_dashboard}>
                {children}
            </div>
        </div>

    )

}