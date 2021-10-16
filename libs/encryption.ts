import crypto from 'crypto';

export default class Encryption {
  private static SALT =
    'u1cFM1GU4NScQr+u4iMFrt5Gog/iu0amoH8eBnsLXzhS7/xhVQ80URVKv2pe+We8VYNPjAZWVdjXN1wl/qcRHw==';
  private static ITERATIONS = 1017;
  private static KEY_LENGTH = 64;
  private static DIGEST = 'sha512';

  static createHashedPassword(password: string) {
    return new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(
        password,
        Encryption.SALT,
        Encryption.ITERATIONS,
        Encryption.KEY_LENGTH,
        Encryption.DIGEST,
        (err, key) => {
          if (err) reject(err);
          resolve(key.toString('base64'));
        }
      );
    });
  }
}
