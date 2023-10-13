import React, { useState, useEffect } from "react";
import axios from "axios";

function ApiPost({ url, requestData }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // POSTリクエスト
    axios
      .post(url, requestData)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url, requestData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  }
}

export default ApiPost;
