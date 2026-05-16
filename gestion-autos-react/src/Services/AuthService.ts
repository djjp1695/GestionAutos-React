export default class AuthService {
    private lienAPI: string;
    private username: string;
    private password: string;

    constructor(lienAPI: string, username: string, password: string) {
        this.lienAPI = lienAPI;
        this.username = username;
        this.password = password;
    }

    async fetchToken() {
        try {
            let response = await fetch(`${this.lienAPI}/Login/`,
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
        catch (err) {
            console.error(err);
            return null;
        }
    }

    async getToken() {
        let token = sessionStorage.getItem('token');
        if (token == null) {
            const newToken = await this.fetchToken();
            if (newToken) {
                sessionStorage.setItem('token', newToken);
                token = newToken;
            }
        }
        else {
            var payload = this.decodeToken(token);
            if (!payload || !payload.exp)
                return null;
            var expDate = new Date(payload.exp * 1000);

            if (expDate < new Date()) {
                const newToken = await this.fetchToken();
                if (newToken) {
                    sessionStorage.setItem('token', newToken);
                    token = newToken;
                }
                else {
                    alert("Impossible de se connecter");
                    return null;
                }
            }
        }
        return token;
    }

    decodeToken(token: string) {
        var base64URL = token.split('.')[1];
        if (!base64URL) return null;
        var base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
        try {
            return JSON.parse(atob(base64));
        }
        catch (e) {
            return null;
        }
    }
}