
// 配置
export interface Options {
  strings?: string
  speed?: number
  lifeLike?: Boolean
}

// 状态
export enum TypeStatus {
  STARTING = 'STARTING',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED'
}
