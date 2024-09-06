import * as bcrypt from 'bcrypt';

const genBase64String = async () => {
    const salt = await bcrypt.genSalt(10);
    const saltBase64 = Buffer.from(salt).toString('base64');
    return saltBase64;
}

const hashUtil = {
    genBase64String
}

export default hashUtil