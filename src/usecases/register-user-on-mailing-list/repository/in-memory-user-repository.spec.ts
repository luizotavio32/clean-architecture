import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const mail = 'any@mail.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, mail })
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })

  test('should return all users if it is found in the repository', async () => {
    const users: UserData[] = [{ name: 'any_name', mail: 'any@mail.com' }, { name: 'second_name', mail: 'second@mail.com' }]
    const userRepo = new InMemoryUserRepository(users)
    const returnedUsers = userRepo.findAllUsers()
    expect((await returnedUsers).length).toBe(2)
  })
})
