import axios from "axios"
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
  }),
  actions: {
    async getUser() {
        try {
            let res = await axios.get('http://localhost:8000/api/user');
            this.user = res.data;
        } catch(err) {
            
        }
    },
    async getXSRFToken() {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    },
    async login({email, password}: any){
        let res = await axios.post('http://localhost:8000/api/login', {
            email,
            password,
        });
        this.user = res.data;
    },
    async register({name, email, password}: any){
      
      
    },
    async logout(){
     
    }
  },
})  