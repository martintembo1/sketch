const crypto = require('crypto');

class Crypto{
    constructor(key){
        this.key = key;
        this.current_encrypted = null;
        this.current_decrytion = null;
    }
    encrypt(data){
        let cipher = crypto.createCipher('aes-128-cbc',this.key);
        let encrypted = cipher.update(data,'utf8','hex');
        encrypted += cipher.final('hex');
        this.current_encrypted = encrypted;
        return encrypted;
    }
    decrypt(data){
        let decipher = crypto.createDecipher('aes-128-cbc',this.key);
        let decrypted = decipher.update(data,'hex','utf8');
        decrypted += decipher.final('utf8');
        this.current_decrytion = decrypted;
        
        return decrypted;
    }
}

module.exports = Crypto;