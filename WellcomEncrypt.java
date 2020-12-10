import java.net.URLEncoder;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class WellcomEncrypt {
    private static final String KEY_CODE = "wellcom";
    private static final String CHARSET_NAME = "UTF-8";
    private static final String ENC_TYPE = "DES";

    //模拟后台
    private static final byte[] DES_KEY = { 21, 1, -110, 82, -32, -85, -128, -65 };

    public static String setEncryptValue(String value) throws Exception {
        BASE64Encoder base64en = new BASE64Encoder();
        byte[] valuebytes = value.getBytes("UTF-8");

        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(1, getSecKey());

        byte[] byteFina = cipher.doFinal(valuebytes);
        String result = base64en.encode(byteFina);
        return URLEncoder.encode(result.replaceAll("\r\n", "").replaceAll("\r", "").replaceAll("\n", ""), "UTF-8");
    }

    public static String getEncryptValue(String encValue) throws Exception {
        String value = null;
        BASE64Decoder base64De = new BASE64Decoder();
        byte[] encValueBytes = base64De.decodeBuffer(encValue);
        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(2, getSecKey());
        byte[] byteFina = cipher.doFinal(encValueBytes);
        value = new String(byteFina, "UTF-8");
        return value;
    }

    private static Key getSecKey() throws NoSuchAlgorithmException {
        KeyGenerator generator = KeyGenerator.getInstance("DES");
        SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
        secureRandom.setSeed("wellcom".getBytes());
        generator.init(secureRandom);
        return generator.generateKey();
    }


    //杭州模拟
    public static String encryptBasedDes(String data)
  {
    String encryptedData = null;
    try
    {
      SecureRandom sr = new SecureRandom();
      DESKeySpec deskey = new DESKeySpec(DES_KEY);

      SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
      SecretKey key = keyFactory.generateSecret(deskey);

      Cipher cipher = Cipher.getInstance("DES");
      cipher.init(1, key, sr);

      encryptedData = new BASE64Encoder().encode(cipher.doFinal(data.getBytes()));
    } catch (Exception e) {
      throw new RuntimeException("加密错误，错误信息：", e);
    }
    return encryptedData;
  }

  public static String decryptBasedDes(String cryptData)
  {
    String decryptedData = null;
    try
    {
      SecureRandom sr = new SecureRandom();
      DESKeySpec deskey = new DESKeySpec(DES_KEY);

      SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
      SecretKey key = keyFactory.generateSecret(deskey);

      Cipher cipher = Cipher.getInstance("DES");
      cipher.init(2, key, sr);

      decryptedData = new String(cipher.doFinal(new BASE64Decoder().decodeBuffer(cryptData)));
    } catch (Exception e) {
      throw new RuntimeException("解密错误，错误信息：", e);
    }
    return decryptedData;
  }

    
    public static void main(String[] args) throws Exception {
        
        System.out.println(setEncryptValue("123456"));
        //System.out.println(getEncryptValue("mxj+VpOropWY/hbzVg2BfA=="));
        System.out.println(encryptBasedDes("123456"));
        System.out.println(decryptBasedDes("mxj+VpOropWY/hbzVg2BfA=="));
    }

}
