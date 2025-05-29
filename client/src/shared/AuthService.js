import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/auth`,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  async login(formData) {
    try {
      const { data } = await this.api.post('/login', formData, { withCredentials: true });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async register(formData) {
    try {
      const { data } = await this.api.post('/register', formData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async verify(verifyData) {
    try {
      const { data } = await this.api.post('/verify', verifyData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async resendVerificationCode(reqData) {
    try {
      const { data } = await this.api.post('/resend-verification-code', reqData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(formData) {
    try {
      const { data } = await this.api.post('/forgot-password', formData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(reqData) {
    try {
      const { data } = await this.api.post('/reset-password', reqData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async validate() {
    try {
      const { data } = await this.api.get('/validate', { withCredentials: true });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const {data} = await this.api.post('/logout', {}, {withCredentials: true});
      return data;
    } catch (error) {
      throw error;      
    }
  }
}

const authService = new AuthService();
export default authService;
