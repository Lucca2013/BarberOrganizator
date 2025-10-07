import { Pool } from 'pg';
import { config } from 'dotenv';
import { NextResponse } from "next/server";

config();

export async function GET(req: Request){
    try{
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });

        const users = await pool.query(
            'SELECT * FROM users'
        )

        if(users.rows === null || users.rows === undefined){
            return NextResponse.json({ message: "false" });
        }

        return NextResponse.json(users.rows);
    }catch (err){
        return NextResponse.json({ message: "error:", err });
    }
}

export async function POST(req: Request){
    try{
        const { name } = await req.json();

        const pool = new Pool({ connectionString: process.env.DATABASE_URL });

        await pool.query(
            'DELETE FROM users WHERE name = $1',
            [name]
        );

        return NextResponse.json({ message: "Appointment deleted!" });
    }catch (err){
        return NextResponse.json({ message: "error:", err });
    }
}