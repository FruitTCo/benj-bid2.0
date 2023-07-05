import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    secret: process.env.NextAuth_SECRET,
    // Configure one or more authentication providers
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },

            async authorize(credentials, req) {
                const { email, password } = credentials
                const res = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, trigger, session, user }) {
            // if (trigger === "update" && session?.address) {
            //     const userNew = {
            //         firstname: user.firstName,
            //         lastname: user.lastName,
            //         phone: user.phone,
            //         createdAt: user.createdAt,
            //         address: session.address,
            //     }
            //     token.user = userNew;
            //     return token
            // }
            // if (trigger === "update" && session?.phone) {
            //     const userNew = {
            //         firstname: user.firstName,
            //         lastname: user.lastName,
            //         phone: session.phone,
            //         createdAt: user.createdAt,
            //         address: user.address,
            //     }
            //     token.user = userNew;
            //     return token
            // }
            if (user) {
                console.log(user);
                const userNew = {
                    firstname: user.firstName,
                    lastname: user.lastName,
                    phone: user.phone,
                    createdAt: user.createdAt,
                    address: user.address,
                }
                token.user = userNew;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            if (token && session.user) {
                // const { ["password"]: _, ...user } = token;
                session.user = token;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
    }
}
export default NextAuth(authOptions)