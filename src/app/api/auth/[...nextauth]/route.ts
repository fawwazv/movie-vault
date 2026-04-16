import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";

const authOptions: NextAuthOptions = {
  //mengatur penggunaan JWT
  session: {
    strategy: "jwt", 
  },
  
  providers: [
    //setup login dengan Google 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    //setup database untuk login dengan email dan password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Mengecek user di database sesuai instruksi PDF
        const [rows]: any = await db.execute(
          "SELECT * FROM users WHERE email = ?", 
          [credentials.email]
        );
        const user = rows[0];

        // Validasi password (di praktikum menggunakan teks biasa)
        if (user && user.password === credentials.password) {
          return { id: user.id.toString(), email: user.email, name: user.email, role: user.role };
        }
        
        // Jika gagal, kembalikan null (gagal login)
        return null;
      }
    })
  ],

  //mengatur isi dari token JWT dan session agar bisa menyimpan informasi role dan id user
  callbacks: {
    async jwt({ token, user, account }) {
      // Jika user baru saja login
      if (user) {
        token.role = (user as any).role || "user";
        token.id = user.id;
      }

      // Jika user login menggunakan Google, otomatiskan data ke Database
      if (account?.provider === "google") {
        const [rows]: any = await db.execute("SELECT * FROM users WHERE email = ?", [token.email]);
        
        if (rows.length === 0) {
          // Jika email google belum ada di DB, insert sebagai 'user'
          const [result]: any = await db.execute(
            "INSERT INTO users (email, role) VALUES (?, ?)", 
            [token.email, "user"]
          );
          token.role = "user";
          token.id = result.insertId;
        } else {
          // Jika sudah ada, ambil rolenya dari DB
          token.role = rows[0].role;
          token.id = rows[0].id;
        }
      }
      return token;
    },
    
    // Meneruskan data dari JWT ke Session agar bisa dibaca oleh komponen frontend
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

// Wajib mengekspor metode GET dan POST di Next.js 13+
export { handler as GET, handler as POST };