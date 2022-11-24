import Image from "next/image";

export default function HeaderFormSign({ styles }) {

    return (
        <div className={styles.container_header_form_sign}>
            <Image src={'https://i.imgur.com/aveGbh4.png'} objectFit='contain' width={90} height={90} />
        </div>
    )

}