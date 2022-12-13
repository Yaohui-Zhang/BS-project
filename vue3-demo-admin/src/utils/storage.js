export const setItem = (key, value) => {
  console.log(2222)
  if (typeof value === 'object') {
    sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    sessionStorage.setItem(key, value)
  }
}

export const getItem = (key) => {
  console.log(1111)
  const result = sessionStorage.getItem(key)
  try {
    return JSON.parse(result)
  } catch (error) {
    return result
  }
}
