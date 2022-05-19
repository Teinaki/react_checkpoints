import { assertFails, assertSucceeds, RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import firebaseApp from 'firebase/compat'
import * as fs from 'fs'
import 'jest'
type Storage = firebaseApp.storage.Storage

let testEnv: RulesTestEnvironment
const userImageRef = (storage: Storage, userId: string, imageName: string) =>
  userImagesRef(storage, userId).child(imageName)
const userImagesRef = (storage: Storage, userId: string) =>
  storage.ref(`users/${userId}`)
const loadIconImage = () => fs.readFileSync('./icon.png')
const contentType = 'image/png'

const PROJECT_ID = 'todo-teinaki';
beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    storage: {
      rules: fs.readFileSync('./storage.rules', 'utf8'),
    },
  })
})
// (2)
beforeEach(async () => await testEnv.clearStorage())
// (3)
afterAll(async () => await testEnv.cleanup()) 

describe('users', () => {
  describe('get', () => {
    describe('if a user is not authenticated', () => {
      const userId = 'user'
      beforeEach(async () => {
        await testEnv.withSecurityRulesDisabled(async context => {
          await userImageRef(context.storage(), userId, 'icon.png').put(loadIconImage(), { contentType }).then()
        })
      })
      test('cannot get image', async () => {
        await assertFails(
          userImageRef(testEnv.unauthenticatedContext().storage(), userId, 'icon.png').getDownloadURL()
        )
      })
    })
    describe('if a user is authenticated', () => {
      const userId = 'user'
      beforeEach(async () => {
        await testEnv.withSecurityRulesDisabled(async context => {
          await userImageRef(context.storage(), userId, 'icon.png').put(loadIconImage())
        })
      })
      describe('try to get user own image', () => {
        test('can get image', async () => {
          await assertSucceeds(
            userImageRef(testEnv.authenticatedContext(userId).storage(), userId, 'icon.png').getDownloadURL()
          )
        })
      })
      describe("another user tries to get user's image", () => {
        test('cannot get image', async () => {
          const userId = 'user'
          const anotherUserId = 'user2'
          await assertFails(
            userImageRef(testEnv.authenticatedContext(anotherUserId).storage(), userId, 'icon.png').getDownloadURL()
          )
        })
      })
    })
  })
});
  //made using tutorial https://medium.com/firebase-developers/how-to-write-firebase-cloud-storage-rules-tests-48559806a268