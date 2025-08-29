class Node
{
   int data;
   Node next;
   Node(int data)
   {
    this.data=data;
    this.next=null;
   }
}
public class stack {
     static Node head=null;
     public static boolean isEmpty()
     {
        return head==null;
     }
     public static void push(int data)
     {
        Node newnode=new Node(data);
        newnode.next=head;
        head=newnode;
        System.out.println(data + " pushed to stack");
     }
     public static void pop()
     {  
        if(isEmpty())
        {
            System.out.println("Stack is empty");
            return;
        }
        System.out.println(head.data);
        head=head.next;
     }
     public static void peek()
     {
        if(isEmpty())
        {
            System.out.println("Stack is empty");
            return;
        }
        System.out.println(head.data);
     }
     public static void display()
     {
         if(isEmpty())
        {
            System.out.println("Stack is empty");
            return;
        }
        Node temp=head;
        while(temp!=null)
        {
            System.out.print(temp.data+" ");
            temp=temp.next;
        }

     }
    public static void main(String[] args) {
        stack s=new stack();
        s.push(10);
        s.pop();
        s.push(20);
        s.push(30);
        s.peek();
        s.display();
    }
}
