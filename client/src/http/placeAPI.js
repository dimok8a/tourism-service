import {$authHost, $host} from "./index";
import md5 from "md5"
import { jwtDecode } from "jwt-decode";

export const createType = async (name) => {
    const {data} = await $authHost.post('api/placeTypes', {name})
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/placeTypes')
    return data
}

export const createPlace = async (place) => {
    const {data} = await $authHost.post('api/place', place)
    return data
}

export const fetchPlaces = async (placeTypeId) => {
    const {data} = await $host.get('api/place', {params: {placeTypeId}})
    return data
}

export const fetchOnePlace = async (id) => {
    const {data} = await $host.get(`api/place/${id}`)
    return data
}
