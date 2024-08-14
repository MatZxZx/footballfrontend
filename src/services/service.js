import ServiceApi from './api/service.api'
import ServiceData from './data/service.data'
import { produccion } from '../config/config' 

export default produccion ? ServiceApi : ServiceData