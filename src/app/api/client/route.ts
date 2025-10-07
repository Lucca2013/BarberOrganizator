import { Pool } from 'pg';
import { config } from 'dotenv';
import { NextResponse } from "next/server";

config();

export async function POST(req: Request)  {
    const { name, cellphone, email } = await req.json();

    if(typeof name !== 'string' || typeof cellphone !== 'string' || typeof email !== 'string'){
        return NextResponse.json({ message: "Invalid credencials" });
    }

    try {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });

        await pool.query(
            'INSERT INTO users (name, cellphone, email) VALUES ($1, $2, $3)',
            [name, cellphone, email]
        );

        return NextResponse.json({ message: "Appointment confirmed!" });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "error:", err });
    }
}