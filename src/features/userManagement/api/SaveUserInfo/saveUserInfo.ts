import axios from "axios";
import { message } from "antd";

const API_URL = "http://localhost:8000";

interface UserInfo {
  userId: string;
  fullName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  birthday?: string;
  website?: string;
  comment?: string;
  position?: string;
  hobby?: string;
  achievements?: string;
  email?: string;
  phone?: string;
}

export const saveUserInfo = async (userInfo: UserInfo) => {
  try {
    console.log("Сохраняемые данные:", userInfo); // Для отладки

    const response = await axios.post(`${API_URL}/user-info`, userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    message.success("Информация успешно сохранена");
    return response.data;
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
    message.error("Ошибка при сохранении данных");
    throw error;
  }
};
