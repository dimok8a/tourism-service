import {$authHost, $host} from "./index";

export const createFeedback = async (feedback) => {
    const {data} = await $authHost.post('api/feedback', feedback)
    return data
}
