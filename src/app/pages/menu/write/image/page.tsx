"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // 로컬 미리보기
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/menu/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadedUrl(`http://localhost:4000${response.data.url}`);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <img src={previewUrl} alt="preview" style={{ width: 150 }} />
      )}
      <button onClick={handleUpload}>Upload</button>
      {uploadedUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedUrl} alt="uploaded" style={{ width: 150 }} />
        </div>
      )}
    </div>
  );
}
