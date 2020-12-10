import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;



public class Test {
    public static void main(String[] args) throws IOException {
        //AppendFile.appendFile("test","test");
        //AppendFile test = new AppendFile();
       // AppendFile.appendFile("", "");
        saveTeaList();
    }
    public static void saveTeaList()
{
	try{
            //定义文件存放的路径及名称
			//String fileName = bsh.args[0] + "\\" + bsh.args[1] + ".csv";
			String fileName = "userinfo.csv";
			FileWriter fstream = new FileWriter(fileName,true);
			BufferedWriter out = new BufferedWriter(fstream);
			//out.write(vars.get("tokens")+",");
            //out.write(bsh.args[0]+bsh.args[1] + "," + bsh.args[2]+"," +  bsh.args[3]+"," +  bsh.args[4]+",");
            out.write("bsh.args[0]+bsh.args[1]" + "," + "bsh.args[2]"+"," +  "bsh.args[3]"+"," + " bsh.args[4]");
			out.write(System.getProperty("line.separator"));
			out.close();
			fstream.close();
			
		//	FileWriter fstream = new FileWriter("C:\\Users\\admin\\Desktop\\tokens.csv",true);
		//	RandomAccessFile randomfile = new RandomAccessFile(fileName,"rw");
            //获取当前文件内容长度
		//	Long fileLength = randomfile.length();
            //设置文件指针位置
		//	randomfile.seek(fileLength);
            //内容写入文件
			//randomfile.write((bsh.args[0]+bsh.args[1] + "," + bsh.args[2] +  bsh.args[3] +  bsh.args[4]+ "\n").getBytes("UTF-8"));
			//randomfile.close();
		}catch(IOException e){
			e.printStackTrace();
			}
}
 

}