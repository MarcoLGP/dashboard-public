import crypto from 'crypto';

const algorithm = process.env.NEXT_PUBLIC_CRYPTO_ALG_SECRET;
const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET;

const encrypt = (text) => {

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${iv.toString('hex')}*${encrypted.toString('hex')};`
};

const decrypt = (hash, key) => {

    const hash_iv = hash.split('*')[0]
    const hash_content = hash.split('*')[1]

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(hash_iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash_content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

export { encrypt, decrypt };
