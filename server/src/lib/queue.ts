import { Queue, Worker, type Processor } from 'bullmq'
import { env } from '../env'

const connection = {
  url: env.REDIS_URL,
}

export function createQueue<T>(name: string): Queue<T> {
  return new Queue<T>(name, { connection })
}

export function createWorker<T>(
  name: string,
  processor: Processor<T>,
): Worker<T> {
  return new Worker<T>(name, processor, {
    connection,
    concurrency: 5,
  })
}
