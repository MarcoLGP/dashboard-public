import ContentFormSign from '../../components/sign/form_sign/ContentFormSign'
import FooterForm from '../../components/sign/form_sign/FooterForm'
import HeaderFormSign from '../../components/sign/form_sign/HeaderFormSign'

export default function FormSign({ styles }) {

    return (
        <div className={styles.formSign}>
            <HeaderFormSign styles={styles} />
            <ContentFormSign styles={styles} />
            <FooterForm styles={styles} />
        </div>
    )

}