import axios from "axios";
import { message } from "antd";

const API_URL = "http://localhost:8000";

interface UserInfo {
  userId: string;
  fullName: string;
  lastName: string;
  city?: string;
  country?: string;
  birthday?: string;
  website?: string;
  comment?: string;
  position?: string;
  hobby?: string;
  achievements?: string;
  email: string;
  phone?: string;
}

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  try {
    console.log("Запрашиваем информацию для userId:", userId); // Для отладки

    const response = await axios.get<UserInfo>(
      `${API_URL}/user-info/${userId}`
    );

    if (!response.data) {
      throw new Error("Данные пользователя не найдены");
    }

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    message.error("Не удалось загрузить информацию о пользователе");
    throw error;
  }
};
