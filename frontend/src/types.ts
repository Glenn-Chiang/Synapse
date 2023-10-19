interface User {
  id: number;
  username: string;

}

interface Chat {
  id: number;
  users: User[]
}

interface Channel {
  id: number;
  members: User[]
}

interface Message {

}