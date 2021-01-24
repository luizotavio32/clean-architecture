import { UserData } from '../../src/entities'
import { UserRepository } from '../../src/usecases/register-user-on-mailing-list/ports'
import { RegisterUserOnMailingList } from '../../src/usecases/register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const mail = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name, mail })
    const user = repo.findUserByEmail('any@email.com')
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidemail = 'invalid_email'
    const response = (await usecase.registerUserOnMailingList({ name: name, mail: invalidemail })).value as Error
    const user = await repo.findUserByEmail(invalidemail)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = ''
    const email = 'any@email.com'
    const response = (await usecase.registerUserOnMailingList({ name: name, mail: email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
