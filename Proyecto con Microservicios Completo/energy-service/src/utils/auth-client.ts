// energy-service/src/utils/auth-client.ts
import axios from 'axios';

export async function validateToken(token: string) {
  const res = await axios.post('http://auth-service:4001/auth/validate', {}, {
    headers: { Authorization: token }
  });
  return res.data;
}