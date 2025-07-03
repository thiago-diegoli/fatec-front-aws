import React from "react";
import { Table } from "react-bootstrap";

const UserTable = ({ users, loading }) => {
  if (loading) return <p>Carregando...</p>;

  return (
    <Table striped bordered hover style={{ textAlign: "center" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>ID</th>
          <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>Nome</th>
          <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
              {user._id}
            </td>
            <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
              {user.nome}
            </td>
            <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
              {user.email}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
