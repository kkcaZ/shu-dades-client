use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce, Key
};

pub fn encrypt(message: String) -> Result<std::vec::Vec<u8>, &'static str> {
    let key = b"12345678901234567890123456789012";
    let key: &Key<Aes256Gcm> = key.into();

    let cipher = Aes256Gcm::new(&key);
    let nonce = Nonce::from_slice(b"unique nonce"); // 96-bits; unique per message
    let ciphertext = cipher.encrypt(&nonce, message.as_ref()).unwrap();

    Ok(ciphertext)
}

pub fn decrypt(data: &[u8]) -> Result<String, &'static str> {
    let key = b"12345678901234567890123456789012";
    let key: &Key<Aes256Gcm> = key.into();

    let nonce = Nonce::from_slice(b"unique nonce");
    let ciphertext = &data;

    let cipher = Aes256Gcm::new(&key);

    match cipher.decrypt(nonce.into(), ciphertext.as_ref()) {
        Ok(decrypted) => {
            let decrypted_text = String::from_utf8(decrypted).map_err(|_| "Invalid UTF-8 in decrypted text")?;
            println!("Decrypted message: {}", decrypted_text);
            Ok(decrypted_text)
        }
        Err(e) => {
            eprintln!("Error: {:?}", e);
            Err("Error decrypting message")
        }
    }
}