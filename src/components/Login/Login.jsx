import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            alert('All fields are required')
            return;
        };

        try {
            const response = await fetch('http://localhost:5002/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            console.log("Raw Response:", response);

            const data = await response.json();

            console.log("Parsed Data:", data);

            if (response.ok) {
                alert('Login successful')
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err) {
            alert('Something went wrong')
            console.log(err);

        };
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
