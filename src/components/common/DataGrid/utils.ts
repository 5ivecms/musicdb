import * as dot from 'dot-object'

export const filterParams = (params: Record<string, string>): object => {
  const dotsObj = dot.dot(params) as Record<string, string>

  const filteredParams = Object.keys(dotsObj)
    .filter((item) => dotsObj[item].length > 0)
    .reduce((acc, item) => ({ ...acc, [item]: dotsObj[item].trim() }), {})

  const preparedParams = dot.object(filteredParams)

  return preparedParams
}
