import java.util.*;
public class code {
    public static void main(String[] args)
    {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int a[]=new int[n];
        for(int i=0;i<n;i++)
        {
            a[i]=sc.nextInt();
        }
        int j=0;
        for(int i=n-1;i>=n/2;i--)
        {
           System.out.print(a[i]+" ");
           if(j!=i)
           {
            System.out.print(a[j++]+" ");
           }
        }
    }
}
