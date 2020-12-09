import { Email } from './email'

describe('Email valdation', () => {
  test('should not accept null strings ', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email ', () => {
    const email = 'any@mail.com'
    expect(Email.validate(email)).toBeTruthy()
  })
})
