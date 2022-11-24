import { signIn } from "next-auth/react"

export default function SocialButton({ styles, platform, children }) {

    return (
        <div className={styles.socialButtonContainer} onClick={() => {
            signIn(`${platform.toLowerCase()}`, {
                callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/callback/${platform}`
            })
        }}>
            <div className={styles.icon_social_button_container}>
                {children}
            </div>
            <span className={styles.font_social_button}>{`Entrar com o ${platform}`}</span>
        </div>
    )

}