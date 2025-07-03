import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, ListGroup } from "react-bootstrap";

const S3Uploader = () => {
  const [buckets, setBuckets] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState("");
  const [file, setFile] = useState(null);
  const [objects, setObjects] = useState([]);
  const [refreshObjects, setRefreshObjects] = useState(0);

  // useEffect para carregar buckets na inicialização
  useEffect(() => {
    async function fetchBuckets() {
      try {
        const response = await axios.get(
          "http://dsm-fatec-backend.duckdns.org/buckets"
        );
        setBuckets(response.data);
      } catch (error) {
        console.error("Erro ao carregar buckets:", error);
      }
    }
    fetchBuckets();
  }, []);

  // useEffect para atualizar objetos quando bucket mudar ou quando refreshObjects mudar
  useEffect(() => {
    if (selectedBucket) {
      loadObjects(selectedBucket);
    }
  }, [selectedBucket, refreshObjects]);

  const loadObjects = async (bucketName) => {
    try {
      const response = await axios.get(
        `http://dsm-fatec-backend.duckdns.org/buckets/${bucketName}`
      );
      setObjects(response.data);
    } catch (error) {
      console.error("Erro ao carregar objetos:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !selectedBucket) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://dsm-fatec-backend.duckdns.org/buckets/${selectedBucket}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Arquivo enviado com sucesso!");
      setFile(null);
      // Trigger refresh dos objetos
      setRefreshObjects((prev) => prev + 1);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar o arquivo");
    }
  };

  const handleBucketChange = async (bucketName) => {
    setSelectedBucket(bucketName);
  };

  const handleDeleteObject = async (fileName) => {
    if (
      !window.confirm(`Tem certeza que deseja excluir o arquivo ${fileName}?`)
    ) {
      return;
    }

    try {
      await axios.delete(
        `http://dsm-fatec-backend.duckdns.org/buckets/${selectedBucket}/file/${fileName}`
      );
      alert("Arquivo excluído com sucesso!");
      // Trigger refresh dos objetos
      setRefreshObjects((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
      alert("Erro ao excluir o arquivo");
    }
  };

  return (
    <div>
      <Form.Group controlId="bucketSelect">
        <Form.Label>Escolha um bucket:</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => handleBucketChange(e.target.value)}
        >
          <option>Selecione um bucket</option>
          {buckets.map((bucket) => (
            <option key={bucket.Name} value={bucket.Name}>
              {bucket.Name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="fileUpload">
        <Form.Label>Selecione um arquivo:</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} value="" />
      </Form.Group>

      <Button
        onClick={handleUpload}
        style={{
          backgroundColor: "#007bff",
          borderColor: "#007bff",
          color: "white",
        }}
      >
        Upload
      </Button>

      {selectedBucket && (
        <div>
          <h3>Objetos no Bucket {selectedBucket}</h3>
          <ListGroup>
            {objects.map((obj) => (
              <ListGroup.Item
                key={obj.Key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{obj.Key}</span>
                <Button
                  size="sm"
                  onClick={() => handleDeleteObject(obj.Key)}
                  style={{
                    backgroundColor: "#dc3545",
                    borderColor: "#dc3545",
                    color: "white",
                  }}
                >
                  Excluir
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default S3Uploader;
