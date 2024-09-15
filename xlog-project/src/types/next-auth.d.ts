import NextAuth from "next-auth";

// Extend tipe `User` untuk menambahkan `username` dan `id`.
declare module "next-auth" {
  interface User {
    id: string;        // Tambahkan properti `id`
    username: string;  // Tambahkan properti `username`
  }

  // Extend `Session` untuk memasukkan `user` yang berisi `id` dan `username`
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

// Extend `JWT` untuk memasukkan `username` dan `id` di dalam token
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}
