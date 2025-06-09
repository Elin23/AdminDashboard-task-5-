interface User {
  firstName: string;
  lastName: string;
  profileImage: string;
}

class UserService {
    saveUserInfo(userData: User): void{
        localStorage.setItem('user', JSON.stringify(userData));
    }
    getUserInfo(): User | null{
        const data = localStorage.getItem('user');
        return data ?  JSON.parse(data) as User: null;
    }
    clearUser(): void {
        localStorage.removeItem('user');
    }
}

export default new UserService();