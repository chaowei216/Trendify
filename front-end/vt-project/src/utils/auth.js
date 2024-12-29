import { decodeToken } from '../utils/decodeJWT'

export const auth  ={
    getAuthHeaders : () => {
        const token = localStorage.getItem('accessToken')
        return {
            Authorization : ` Bearer ${token}`,
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

 if(user.auth==='ADMIN'){
    navigate('/admin')
 } else if (user.auth === 'STAFF'){
    navigate('/staff')
    
 } else {
    navigate ('/product')
 }
} catch (error) {
    console.error('Error decoding token or navigating:', error)
  }
},
}
