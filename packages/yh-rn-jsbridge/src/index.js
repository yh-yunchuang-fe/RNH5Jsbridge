import {makeSingleton} from '@yh-rn/yh-common-utils'
import RNH5JsBridge from './bridge'

const instance = makeSingleton(RNH5JsBridge)()

export default instance