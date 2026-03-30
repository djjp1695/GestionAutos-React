export default class AuthService {
    constructor(lienAPI, username, password) {
        this.lienAPI = lienAPI;
        this.username = username;
        this.password = password;
    }

    async getToken() {
        let response = await fetch(`${this.lienAPI}/Login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.username, password: this.password })

            })
        if (!response.ok)
            console.error(response.status);
        else {
            const data = await response.json();
            return data.token;
        }
    }
    catch(err) {
        console.error(err);
        return null;
    }
}