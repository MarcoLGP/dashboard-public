import SocialButtons from '../../components/sign/social_sign/content_social_sign/SocialSignButtons'

export default function SocialSign({ styles }) {

    return (
        <div className={styles.socialSign}>
            <SocialButtons styles={styles} />
        </div>
    )

}