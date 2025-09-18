import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function detectHuman(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/detect`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 30 seconds
    });

    return {
      success: response.data.success,
      boxes: response.data.boxes || [],
      count: response.data.count || 0,
      confidences: response.data.confidence_scores || [],
      timestamp: response.data.timestamp,
      imageSize: response.data.image_size,
      modelUsed: response.data.model_used,
      processingTime: response.data.processing_time
    };
  } catch (error) {
    console.error("Detection API Error:", error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error("Detection timeout - processing took too long");
    }
    
    const errorMessage = error.response?.data?.detail || "Guard-X AI system connection failed";
    throw new Error(errorMessage);
  }
}

export async function checkHealth() {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    return { status: 'offline', error: error.message };
  }
}

export async function getModelsInfo() {
  try {
    const response = await axios.get(`${API_URL}/models`);
    return response.data;
  } catch (error) {
    console.error("Models info failed:", error);
    return { available_models: [], active_model: null };
  }
}