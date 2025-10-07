"use client";
import "./style.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Client() {
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cellphone, email }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <html>
      <body>
        <div>
          <button id="button" onClick={() => router.push("/owner")} className="buttonBack">
            <p>Go to Owner page</p>
          </button>

          <h1 className="title">barberOrganizator</h1>

          <div className="appointment-div">
            <h2 className="appointment-h2">Make your appointment</h2>

            <form onSubmit={handleConfirm}>
              <label className="appointment-p">Name</label>
              <input
                type="text"
                required
                className="appointment-p"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="appointment-p">Cellphone</label>
              <input
                type="text"
                required
                className="appointment-p"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />

              <label className="appointment-p">Email</label>
              <input
                type="text"
                required
                className="appointment-p"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="formButton" role="button" id="button" type="submit">
                <p className="formButton p">Confirm</p>
              </button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
}
