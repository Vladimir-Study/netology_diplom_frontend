export async function updateAccessToken(apiRequsetFunction, data) {
  try {
    await apiRequsetFunction(data).unwrap()
  } catch (error) {
    console.log(error, 'updateAccessToken')
  }
}