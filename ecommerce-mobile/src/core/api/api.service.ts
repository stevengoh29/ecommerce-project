import axios, { AxiosPromise } from "axios"
import API_CONSTANT from "../constant/constant"

const client = axios.create({
    baseURL: `${API_CONSTANT.API_ENDPOINT}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }
})

class ApiService {
    static get(path = '', params = {}, optionalHeader = {}): AxiosPromise {
        return client({
            method: 'GET',
            url: path,
            params,
            headers: { ...optionalHeader }
        })
    }
    static getDownload(path = '', optionalHeader = {}): AxiosPromise {
        return client({
            method: 'GET',
            url: path,
            headers: { ...optionalHeader },
            maxBodyLength: Infinity,
            responseType: 'arraybuffer'
        })
    }

    static post(path = '', data = {}, optionalHeader = {}): AxiosPromise {
        return client({
            method: 'POST',
            url: path,
            data,
            headers: { ...optionalHeader }
        })
    }

    static patch(path = '', data = {}, optionalHeader = {}): AxiosPromise {
        return client({
            method: 'PATCH',
            url: path,
            data: data,
            headers: { ...optionalHeader }
        })
    }

    static put(path = '', data = {}): AxiosPromise {
        return client({
            method: 'PUT',
            url: path,
            data: data
        })
    }

    static delete(path = '', data = {}): AxiosPromise {
        return client({
            method: 'DELETE',
            url: path,
            data: JSON.stringify(data)
        })
    }

    static download(path = ''): AxiosPromise {
        return client({
            method: 'GET',
            url: path,
            responseType: 'blob' // important
        })
    }
}

// this holds any in-progress token refresh requests
let refreshTokenPromise: Promise<string> | null = null

const getNewAccessToken = async (): Promise<any> => {
    //   return axios
    //     .post(
    //       API_ENDPOINT + '/api/v1' + API.auth.refresh,
    //       {},
    //       {
    //         headers: {
    //           Authorization: `Bearer ${await getData(
    //             AsyncStorageKeys.refreshTokenKey
    //           )}`
    //         }
    //       }
    //     )
    //     .then(async res => {
    //       if (res) {
    //         await storeData(
    //           AsyncStorageKeys.accessTokenKey,
    //           res.data.data.access_token
    //         )
    //         await storeData(
    //           AsyncStorageKeys.refreshTokenKey,
    //           res.data.data.refresh_token
    //         )

    //         return res.data.data.access_token
    //       }
    //     })
    //     .catch(() => {
    //       // Increase repeat count
    //       repeatCount++

    //       dispatch(handleLogout())
    //     })
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
// client.interceptors.request.use(async config => {
//     // do something before executing the request
//     // For example tag along the bearer access token to request header or set a cookie
//     const accessToken = await getData(AsyncStorageKeys.accessTokenKey)

//     if (accessToken) {
//         config.headers = {
//             ...(config.headers as any),
//             Authorization: `Bearer ${accessToken}`
//         }
//     }

//     return config
// })

// client.interceptors.response.use(
//     response => response,
//     async error => {
//         /**
//          * Do something in case the response returns an error code [3**, 4**, 5**] etc
//          * For example, on token expiration retrieve a new access token, retry a failed request etc
//          */

//         const { response } = error

//         // Handle network error
//         if (error.toJSON().message === 'Network Error') {
//             dispatch(handleOffline())
//         }

//         if (response) {
//             // Handle access token expired, logout user and show message
//             if (response.status === 401) {
//                 // Attempt to get new access token with refresh token
//                 const refreshToken = await getData(AsyncStorageKeys.refreshTokenKey)

//                 // Dont attempt to spam continous without a succeed call on original request
//                 if (!refreshToken || repeatCount > 3) {
//                     dispatch(handleLogout())

//                     if (response.data.message !== 'Unauthorized')
//                         return Promise.reject(response)
//                     else
//                         return dispatch(
//                             toggleSnackbar(
//                                 'Your account has been logged out. It may due to other device logged in.'
//                             )
//                         )
//                 }

//                 if (!refreshTokenPromise) {
//                     // check for an existing in-progress request
//                     // if nothing is in-progress, start a new refresh token request
//                     refreshTokenPromise = getNewAccessToken().then(
//                         (_accessToken: string) => {
//                             refreshTokenPromise = null // clear state

//                             return _accessToken // resolve with the new token
//                         }
//                     )
//                 }

//                 if (refreshTokenPromise) {
//                     return refreshTokenPromise.then(accessToken => {
//                         error.config.headers['Authorization'] = `Bearer ${accessToken}`

//                         return client.request(error.config).then(result => {
//                             // If original request is success then reset repeatCount
//                             repeatCount = 0

//                             return result
//                         })
//                     })
//                 }
//             }

//             // Handle rate limit, show error message
//             if (response.status === 429) {
//                 // Show error message
//             }

//             if (response.status === 500) {
//                 // do something here
//             }

//             return Promise.reject(response)
//         }

//         return Promise.reject(error)
//     }
// )


export default ApiService