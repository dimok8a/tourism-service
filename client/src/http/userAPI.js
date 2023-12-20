import {$authHost, $host} from "./index";
import md5 from "md5"
import { jwtDecode } from "jwt-decode";

export const registration = async (name, mail, password) => {
    const {data} = await $host.post('api/user/registration', {name, mail, hash: md5(mail+password)})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (mail, password) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const {data} = await $host.post('api/user/login', {mail, hash: md5(md5(mail+password)+randomNumber), randomNumber})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
