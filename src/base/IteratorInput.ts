export interface IteratorInput {
  /**
   * The current index.
   */
  index: number
  /**
   * The amount to increment the counter by on each iteration.
   */
  step: number
  /**
   * The number of times to iterate (or, the number of items to iterate over).
   */
  count: number
  /**
   * Indicates whether or not to continue iterating.
   */
  continue: boolean
}
