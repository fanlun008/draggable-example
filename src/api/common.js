import { get, post} from '@/utils/httpService'

export const createToken = (param) => get('/createToken', param)

