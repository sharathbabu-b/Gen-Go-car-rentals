import axios from 'axios'
export default axios.create({
    baseURL:'http://localhost:3500'
    // baseURL:'https://gen-go-car-rentals.onrender.com/'
})