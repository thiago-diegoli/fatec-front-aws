import React from "react";
import { Table } from "react-bootstrap";

const ProductTable = ({ products, loading }) => {
  if (loading) return <p>Carregando...</p>;

  return (
    <Table striped bordered hover style={{ textAlign: "center" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>ID</th>
          <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>Nome</th>
          <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>
            Descrição
          </th>
          <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>Preço</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.Id}>
            <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
              {product.Id}
            </td>
            <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
              {product.Nome}
            </td>
            <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
              {product.Descricao}
            </td>
            <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
              {product.Preco}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
