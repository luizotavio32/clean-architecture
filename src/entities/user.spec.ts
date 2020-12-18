import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'

describe('user domain class', () => {
  test('should not create user with invalid e-mail address', async () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', mail: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O      '
    const error = User.create({ name: invalidName, mail: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, mail: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })
})
