"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";

export default function Owner() {
  const router = useRouter();

  const [showClient, setShowClient] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/owner", { method: "GET" });
      const data = await res.json();
      console.log(data)
      setUsers(data);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.FormEvent, name: string) => {
    e.preventDefault();

    const res = await fetch("api/owner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    alert(data.message);

    setUsers((prev) => prev.filter((u) => u.name !== name));
  }

  return (
    <html>
      <body>
        <div>
          <header>
            <button id="button" onClick={() => router.push("/client")}className="buttonBack">
              <p>Go to client page</p>
            </button>
          </header>

          <h1 className="title">Owner Dashboard</h1>
          <div className="ShowReservations">
            {loading ? (<p className="ReservationsP">Loading...</p>) : users.length > 0 ? (
              users.map((user, index) => (
                <div key={index} className="reservation-card">
                  <div>
                    <p className="ReservationsP">
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p className="ReservationsP">
                      <strong>Cellphone:</strong> {user.cellphone}
                    </p>
                    <p className="ReservationsP">
                      <strong>Email:</strong> {user.email}
                    </p>
                  </div>
                  <button className="button" onClick={(e) => handleDelete(e, user.name)}>
                      <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="NoReservationsP">There are no reservations</p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
