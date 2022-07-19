import { bytes32ToUuid, uuidToBytes32 } from '../../src/uuid'

describe('bytes32ToUuid()', () => {
  it('converts a bytes32 string to uuid', () => {
    const uuid = bytes32ToUuid('0x6239663266313538643738303433386662396562663062333034373662383666')
    expect(uuid).toBe('b9f2f158-d780-438f-b9eb-f0b30476b86f')
  })
})

describe('uuidToBytes32()', () => {
  it('converts a uuid bytes32', () => {
    const uuid = uuidToBytes32('b9f2f158-d780-438f-b9eb-f0b30476b86f')
    expect(uuid).toBe('0x6239663266313538643738303433386662396562663062333034373662383666')
  })
})
