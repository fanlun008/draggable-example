import { get, post} from '@/utils/httpService'

export const createToken = (param) => get('/createToken', param)

export const validateToken = (param) => get('/validToken', param)

