import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function detectHuman(file) {
  const form = new FormData();
  form.append("file", file);

  try {
    const res = await axios.post(API_URL, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
