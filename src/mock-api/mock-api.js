class MockApi {

    getTowers() {
        return fakeApi([
            {
                name: 'А',
                id: 1
            },
            {
                name: 'Б',
                id: 2
            },
        ])

    }
    getRooms(tower, floor) {
        return fakeApi(new Array(10).fill().map(
            (elem, i) => ({ 
                    name: createRoomNumber(tower, floor, i + 1), 
                    id: createRoomId(tower, floor, i + 1) 
                })
            ))
    }
    getFloors() {
        return fakeApi(new Array(25).fill().map(
            (elem, i) => ({ 
                    name: `Этаж ${i + 3}`, 
                    id: i + 3 
                })
            ))
    }

}

function fakeApi(data) {
    return new Promise((res) => res(data))
}

function createRoomNumber(tower, floor, num) {
    return `${tower === 1 ? 'А' : 'Б'}-${floor > 9 ? floor : '0' + floor}${num > 9 ? num : '0' + num}`
}
function createRoomId(towerId, floorId, number) {
    return Number(String(towerId) + String(floorId) + String(number))
}

export const mockApi = new MockApi()