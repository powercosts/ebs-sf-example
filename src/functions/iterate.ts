import { Context, Handler } from 'aws-lambda'
import { IteratorInput } from '../base/IteratorInput';

const handler: Handler = async (event: IteratorInput, context: Context): Promise<IteratorInput> => {
  let index = event.index
  let step = event.step
  let count = event.count

  index += step

  const returnObj: IteratorInput = {
    index,
    step,
    count,
    continue: index < count
  }

  return returnObj
}

export { handler }
