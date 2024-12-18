import { decodeToken } from '../utils/decodeJWT'

export const auth  ={
    getAuthHeaders : () => {
        const token = localStorage.getItem('accessToken')
        return {
            Authorization : ` ${token}`,
            'Content-Type': 'application/json'
        }
    },
    // Điều hướng
    handleUserNavigation: (navigate) =>{
        try {
            const token = localStorage.getItem('accessToken')
 if (!token){
throw new Error('No token here')
 }
 const user = decodeToken()

 if(user.Role ==='Admin'){
    navigate('/admin')
 } else if (
    Array.isArray(user.Role)&&
    user.Role.includes('Staff')
 ){
    navigate('/staff')
    
 } else {
    navigate ('/product')
 }
} catch (error) {
    console.error('Error decoding token or navigating:', error)
  }
},
}
