"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldBehaveLikeBalanceAdapter = void 0;
const helpers_1 = require("../helpers");
function base(execute) {
    describe('it should behave like a balance adapter', () => {
        const jobID = '1';
        helpers_1.validationErrors([
            { name: 'empty body', testData: {} },
            {
                name: 'empty addresses',
                testData: {
                    id: jobID,
                    data: {
                        endpoint: 'balance',
                        result: [],
                    },
                },
            },
            {
                name: 'unknown endpoint',
                testData: {
                    id: jobID,
                    data: {
                        endpoint: 'not_real',
                        result: [
                            {
                                address: '35ULMyVnFoYaPaMxwHTRmaGdABpAThM4QR',
                                coin: 'btc',
                                chain: 'mainnet',
                            },
                        ],
                    },
                },
            },
            {
                name: 'invalid dataPath',
                testData: {
                    id: jobID,
                    data: {
                        endpoint: 'balance',
                        dataPath: 'not_real',
                        result: [
                            {
                                address: 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF',
                                coin: 'btc',
                                chain: 'mainnet',
                            },
                        ],
                    },
                },
            },
        ], execute);
        helpers_1.serverErrors([
            {
                name: 'invalid address',
                testData: {
                    id: jobID,
                    data: {
                        endpoint: 'balance',
                        result: [
                            {
                                address: 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF',
                                coin: 'btc',
                                chain: 'mainnet',
                            },
                        ],
                    },
                },
            },
            {
                name: 'invalid confirmations',
                testData: {
                    id: jobID,
                    data: {
                        endpoint: 'balance',
                        confirmations: null,
                        result: [
                            {
                                address: 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF',
                                coin: 'btc',
                                chain: 'mainnet',
                            },
                        ],
                    },
                },
            },
            {
                name: 'invalid chain',
                testData: {
                    id: jobID,
                    data: {
                        endpoint: 'balance',
                        result: [
                            {
                                address: 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF',
                                coin: 'btc',
                                chain: 'not_real',
                            },
                        ],
                    },
                },
            },
            {
                name: 'invalid coin',
                testData: {
                    id: jobID,
                    data: {
                        endpoint: 'balance',
                        result: [
                            {
                                address: 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF',
                                coin: 'not_real',
                                chain: 'mainnet',
                            },
                        ],
                    },
                },
            },
        ], execute);
    });
}
const extensions = {
    bitcoin_mainnet: (execute) => {
        describe('it should support bitcoin mainnet', () => {
            const jobID = '1';
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'id not supplied',
                    testData: {
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    address: '3D8DJLwUXFfZvE8yJRu729MZ8uLy25SuLz',
                                    coin: 'btc',
                                    chain: 'mainnet',
                                },
                                {
                                    address: '3KTeq879YjzhqkAXzZmdapJAVC6qz5qEth',
                                    coin: 'btc',
                                    chain: 'mainnet',
                                },
                            ],
                        },
                    },
                },
                {
                    name: 'BTC mainnet',
                    testData: {
                        id: jobID,
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    address: '3EyjZ6CtEZEKyc719NZMyWaJpJG5jsVJL1',
                                    coin: 'btc',
                                    chain: 'mainnet',
                                },
                                {
                                    address: '38bzm6nhQMFJe71jJw1U7CbgNrVNpkonZF',
                                    coin: 'btc',
                                    chain: 'mainnet',
                                },
                                {
                                    address: '3ANaBZ6odMrzdg9xifgRNxAUFUxnReesws',
                                    coin: 'btc',
                                    chain: 'mainnet',
                                },
                                {
                                    address: '3FFgKaYkEf1M73QtzuY9DGqC7VeM2sAQhT',
                                    coin: 'btc',
                                    chain: 'mainnet',
                                },
                                {
                                    address: '35ULMyVnFoYaPaMxwHTRmaGdABpAThM4QR',
                                    coin: 'btc',
                                    chain: 'mainnet',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    bitcoin_testnet: (execute) => {
        describe('it should support bitcoin testnet', () => {
            const jobID = '1';
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'BTC testnet',
                    testData: {
                        id: jobID,
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    address: 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF',
                                    chain: 'testnet',
                                    coin: 'btc',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    ethereum_mainnet: (execute) => {
        describe('it should support ethereum mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ETH testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'eth',
                                    chain: 'mainnet',
                                    address: '0x664EEe181C2d65619F367c5AaC7d42F571B61177',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    ethereum_testnet: (execute) => {
        describe('it should support ethereum testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ETH testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'eth',
                                    chain: 'testnet',
                                    address: '0x664EEe181C2d65619F367c5AaC7d42F571B61177',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    bitcoin_cash_mainnet: (execute) => {
        describe('it should support bitcoin cash mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'BCH mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'bch',
                                    chain: 'mainnet',
                                    address: 'qp3wjpa3tjlj042z2wv7hahsldgwhwy0rq9sywjpyy',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    bitcoin_cash_testnet: (execute) => {
        describe('it should support bitcoin cash testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'BCH testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'bch',
                                    chain: 'testnet',
                                    address: 'muLqdHvyvbbB9oz4xnWotEuGVVeJtQZQxx',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    bitcoin_sv_mainnet: (execute) => {
        describe('it should support bitcoin sv mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'BTC SV mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'btsv',
                                    chain: 'mainnet',
                                    address: '1Hw2k2iuhzcrA1Rvm6EuCoiCSp7Sc6mdrv',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    bitcoin_sv_testnet: (execute) => {
        describe('it should support bitcoin sv testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'BTC SV testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'btsv',
                                    chain: 'testnet',
                                    address: 'qzlqpln4k995wsjlhl9dcw6kacwv06ka6580wavplr',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    litecoin_mainnet: (execute) => {
        describe('it should support litecoin mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'LTC mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'ltc',
                                    chain: 'mainnet',
                                    address: 'M8T1B2Z97gVdvmfkQcAtYbEepune1tzGua',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    litecoin_testnet: (execute) => {
        describe('it should support litecoin testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'LTC testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'ltc',
                                    chain: 'testnet',
                                    address: '2N2PJEucf6QY2kNFuJ4chQEBoyZWszRQE16',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    zcash_mainnet: (execute) => {
        describe('it should support zcash mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ZEC mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'zec',
                                    chain: 'mainnet',
                                    address: 't1VShHAhsQc5RVndQLyM1ZbQXLHKd35GkG1',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    zcash_testnet: (execute) => {
        describe('it should support zcash testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ZEC testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'zec',
                                    chain: 'testnet',
                                    address: 'tmA64veBVeGVe53MjK2AAAdRo2S4MAqs2oU',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    doge_mainnet: (execute) => {
        describe('it should support doge mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'DOGE mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'doge',
                                    chain: 'mainnet',
                                    address: 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    doge_testnet: (execute) => {
        describe('it should support doge testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'DOGE testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'doge',
                                    chain: 'testnet',
                                    address: '2MtF65ZhrkqsHsNoFtA91e1AdveqXLMvS5M',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    zilliqa_mainnet: (execute) => {
        describe('it should support zilliqa mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ZIL mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'zil',
                                    chain: 'mainnet',
                                    address: 'zil16cgczanfw3ml5w5rutg7pyrncdx6ue4xcgt6gg',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    zilliqa_testnet: (execute) => {
        describe('it should support zilliqa testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ZIL testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'zil',
                                    chain: 'testnet',
                                    address: 'zil1qwzy0kc7p5gg4xn44d4ysfj9r5p49ydsygdxu4',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    dash_mainnet: (execute) => {
        describe('it should support dash mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'DOGE mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'dash',
                                    chain: 'mainnet',
                                    address: 'Xo2w6T1PjgaZ4PHLcoceueAQZifdDQ5ViD',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    dash_testnet: (execute) => {
        describe('it should support dash testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'DOGE testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'dash',
                                    chain: 'testnet',
                                    address: 'yLegnSEA83TTfo67XXLaszLUcxYQCrLjwH',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    ethereum_classic_mainnet: (execute) => {
        describe('it should support ethereum_classic mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ETC mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'etc',
                                    chain: 'mainnet',
                                    address: '0xd6054746a43e3a5c47a18796dc47437574127561',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    ethereum_classic_testnet: (execute) => {
        describe('it should support ethereum_classic testnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'ETC testnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'etc',
                                    chain: 'testnet',
                                    address: '0xDf7D7e053933b5cC24372f878c90E62dADAD5d42',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
    groestlcoin_mainnet: (execute) => {
        describe('it should support groestlcoin mainnet', () => {
            const assertions = (request, response) => {
                const numAddr = request?.testData?.data?.result.length;
                expect(Number(response.data.result.length)).toBeGreaterThan(0);
                expect(Number(response.result.length)).toBeGreaterThan(0);
                expect(Number(response.data.result.length)).toEqual(numAddr);
                expect(Number(response.result.length)).toEqual(numAddr);
            };
            helpers_1.successes([
                {
                    name: 'GRS mainnet',
                    testData: {
                        id: '1',
                        data: {
                            endpoint: 'balance',
                            result: [
                                {
                                    coin: 'grs',
                                    chain: 'mainnet',
                                    address: 'Fai7L9MJHa58NBe4RS4s4foXmBeMyN6N7a',
                                },
                            ],
                        },
                    },
                },
            ], execute, assertions);
        });
    },
};
function shouldBehaveLikeBalanceAdapter(execute, networks) {
    base(execute);
    for (const network of networks) {
        const extension = extensions[network];
        if (extension)
            extension(execute);
    }
}
exports.shouldBehaveLikeBalanceAdapter = shouldBehaveLikeBalanceAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iZWhhdmlvcnMvYmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3Q0FBc0U7QUFFdEUsU0FBUyxJQUFJLENBQUMsT0FBZ0I7SUFDNUIsUUFBUSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtRQUN2RCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUE7UUFDakIsMEJBQWdCLENBQ2Q7WUFDRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUNwQztnQkFDRSxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixRQUFRLEVBQUU7b0JBQ1IsRUFBRSxFQUFFLEtBQUs7b0JBQ1QsSUFBSSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxTQUFTO3dCQUNuQixNQUFNLEVBQUUsRUFBRTtxQkFDWDtpQkFDRjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsUUFBUSxFQUFFO29CQUNSLEVBQUUsRUFBRSxLQUFLO29CQUNULElBQUksRUFBRTt3QkFDSixRQUFRLEVBQUUsVUFBVTt3QkFDcEIsTUFBTSxFQUFFOzRCQUNOO2dDQUNFLE9BQU8sRUFBRSxvQ0FBb0M7Z0NBQzdDLElBQUksRUFBRSxLQUFLO2dDQUNYLEtBQUssRUFBRSxTQUFTOzZCQUNqQjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsUUFBUSxFQUFFO29CQUNSLEVBQUUsRUFBRSxLQUFLO29CQUNULElBQUksRUFBRTt3QkFDSixRQUFRLEVBQUUsU0FBUzt3QkFDbkIsUUFBUSxFQUFFLFVBQVU7d0JBQ3BCLE1BQU0sRUFBRTs0QkFDTjtnQ0FDRSxPQUFPLEVBQUUsb0NBQW9DO2dDQUM3QyxJQUFJLEVBQUUsS0FBSztnQ0FDWCxLQUFLLEVBQUUsU0FBUzs2QkFDakI7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7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LDhCQUE4QixDQUFDLE9BQWdCLEVBQUUsUUFBbUI7SUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWIsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUU7UUFDOUIsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JDLElBQUksU0FBUztZQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUNsQztBQUNILENBQUM7QUFQRCx3RUFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4ZWN1dGUgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgc2VydmVyRXJyb3JzLCBzdWNjZXNzZXMsIHZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICcuLi9oZWxwZXJzJ1xuXG5mdW5jdGlvbiBiYXNlKGV4ZWN1dGU6IEV4ZWN1dGUpIHtcbiAgZGVzY3JpYmUoJ2l0IHNob3VsZCBiZWhhdmUgbGlrZSBhIGJhbGFuY2UgYWRhcHRlcicsICgpID0+IHtcbiAgICBjb25zdCBqb2JJRCA9ICcxJ1xuICAgIHZhbGlkYXRpb25FcnJvcnMoXG4gICAgICBbXG4gICAgICAgIHsgbmFtZTogJ2VtcHR5IGJvZHknLCB0ZXN0RGF0YToge30gfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdlbXB0eSBhZGRyZXNzZXMnLFxuICAgICAgICAgIHRlc3REYXRhOiB7XG4gICAgICAgICAgICBpZDogam9iSUQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgIHJlc3VsdDogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAndW5rbm93biBlbmRwb2ludCcsXG4gICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgIGlkOiBqb2JJRCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdub3RfcmVhbCcsXG4gICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICczNVVMTXlWbkZvWWFQYU14d0hUUm1hR2RBQnBBVGhNNFFSJyxcbiAgICAgICAgICAgICAgICAgIGNvaW46ICdidGMnLFxuICAgICAgICAgICAgICAgICAgY2hhaW46ICdtYWlubmV0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2ludmFsaWQgZGF0YVBhdGgnLFxuICAgICAgICAgIHRlc3REYXRhOiB7XG4gICAgICAgICAgICBpZDogam9iSUQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgIGRhdGFQYXRoOiAnbm90X3JlYWwnLFxuICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnbjRWUTVZZEhmN2hMUTJnV1FZWXJjeG9FNUI3bld1REZORicsXG4gICAgICAgICAgICAgICAgICBjb2luOiAnYnRjJyxcbiAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBleGVjdXRlLFxuICAgIClcblxuICAgIHNlcnZlckVycm9ycyhcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdpbnZhbGlkIGFkZHJlc3MnLFxuICAgICAgICAgIHRlc3REYXRhOiB7XG4gICAgICAgICAgICBpZDogam9iSUQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICduNFZRNVlkSGY3aExRMmdXUVlZcmN4b0U1QjduV3VERk5GJyxcbiAgICAgICAgICAgICAgICAgIGNvaW46ICdidGMnLFxuICAgICAgICAgICAgICAgICAgY2hhaW46ICdtYWlubmV0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2ludmFsaWQgY29uZmlybWF0aW9ucycsXG4gICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgIGlkOiBqb2JJRCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgY29uZmlybWF0aW9uczogbnVsbCxcbiAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ240VlE1WWRIZjdoTFEyZ1dRWVlyY3hvRTVCN25XdURGTkYnLFxuICAgICAgICAgICAgICAgICAgY29pbjogJ2J0YycsXG4gICAgICAgICAgICAgICAgICBjaGFpbjogJ21haW5uZXQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnaW52YWxpZCBjaGFpbicsXG4gICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgIGlkOiBqb2JJRCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ240VlE1WWRIZjdoTFEyZ1dRWVlyY3hvRTVCN25XdURGTkYnLFxuICAgICAgICAgICAgICAgICAgY29pbjogJ2J0YycsXG4gICAgICAgICAgICAgICAgICBjaGFpbjogJ25vdF9yZWFsJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2ludmFsaWQgY29pbicsXG4gICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgIGlkOiBqb2JJRCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ240VlE1WWRIZjdoTFEyZ1dRWVlyY3hvRTVCN25XdURGTkYnLFxuICAgICAgICAgICAgICAgICAgY29pbjogJ25vdF9yZWFsJyxcbiAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBleGVjdXRlLFxuICAgIClcbiAgfSlcbn1cblxuY29uc3QgZXh0ZW5zaW9uczogeyBbbmV0d29yazogc3RyaW5nXTogKGV4ZWN1dGU6IEV4ZWN1dGUpID0+IHZvaWQgfSA9IHtcbiAgYml0Y29pbl9tYWlubmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCBiaXRjb2luIG1haW5uZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBqb2JJRCA9ICcxJ1xuXG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdpZCBub3Qgc3VwcGxpZWQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICczRDhESkx3VVhGZlp2RTh5SlJ1NzI5TVo4dUx5MjVTdUx6JyxcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2J0YycsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnM0tUZXE4NzlZanpocWtBWHpabWRhcEpBVkM2cXo1cUV0aCcsXG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdidGMnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ21haW5uZXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdCVEMgbWFpbm5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogam9iSUQsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludDogJ2JhbGFuY2UnLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnM0V5alo2Q3RFWkVLeWM3MTlOWk15V2FKcEpHNWpzVkpMMScsXG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdidGMnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ21haW5uZXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJzM4YnptNm5oUU1GSmU3MWpKdzFVN0NiZ05yVk5wa29uWkYnLFxuICAgICAgICAgICAgICAgICAgICBjb2luOiAnYnRjJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICdtYWlubmV0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICczQU5hQlo2b2RNcnpkZzl4aWZnUk54QVVGVXhuUmVlc3dzJyxcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2J0YycsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnM0ZGZ0thWWtFZjFNNzNRdHp1WTlER3FDN1ZlTTJzQVFoVCcsXG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdidGMnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ21haW5uZXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJzM1VUxNeVZuRm9ZYVBhTXh3SFRSbWFHZEFCcEFUaE00UVInLFxuICAgICAgICAgICAgICAgICAgICBjb2luOiAnYnRjJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICdtYWlubmV0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgYXNzZXJ0aW9ucyxcbiAgICAgIClcbiAgICB9KVxuICB9LFxuXG4gIGJpdGNvaW5fdGVzdG5ldDogKGV4ZWN1dGUpID0+IHtcbiAgICBkZXNjcmliZSgnaXQgc2hvdWxkIHN1cHBvcnQgYml0Y29pbiB0ZXN0bmV0JywgKCkgPT4ge1xuICAgICAgY29uc3Qgam9iSUQgPSAnMSdcblxuICAgICAgY29uc3QgYXNzZXJ0aW9ucyA9IChyZXF1ZXN0OiBhbnksIHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgbnVtQWRkciA9IHJlcXVlc3Q/LnRlc3REYXRhPy5kYXRhPy5yZXN1bHQubGVuZ3RoXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgfVxuXG4gICAgICBzdWNjZXNzZXMoXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQlRDIHRlc3RuZXQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6IGpvYklELFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ240VlE1WWRIZjdoTFEyZ1dRWVlyY3hvRTVCN25XdURGTkYnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ3Rlc3RuZXQnLFxuICAgICAgICAgICAgICAgICAgICBjb2luOiAnYnRjJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgYXNzZXJ0aW9ucyxcbiAgICAgIClcbiAgICB9KVxuICB9LFxuXG4gIGV0aGVyZXVtX21haW5uZXQ6IChleGVjdXRlKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2l0IHNob3VsZCBzdXBwb3J0IGV0aGVyZXVtIG1haW5uZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdFVEggdGVzdG5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2V0aCcsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICcweDY2NEVFZTE4MUMyZDY1NjE5RjM2N2M1QWFDN2Q0MkY1NzFCNjExNzcnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgZXRoZXJldW1fdGVzdG5ldDogKGV4ZWN1dGUpID0+IHtcbiAgICBkZXNjcmliZSgnaXQgc2hvdWxkIHN1cHBvcnQgZXRoZXJldW0gdGVzdG5ldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2VydGlvbnMgPSAocmVxdWVzdDogYW55LCByZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG51bUFkZHIgPSByZXF1ZXN0Py50ZXN0RGF0YT8uZGF0YT8ucmVzdWx0Lmxlbmd0aFxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgIH1cblxuICAgICAgc3VjY2Vzc2VzKFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0VUSCB0ZXN0bmV0JyxcbiAgICAgICAgICAgIHRlc3REYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludDogJ2JhbGFuY2UnLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb2luOiAnZXRoJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICd0ZXN0bmV0JyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJzB4NjY0RUVlMTgxQzJkNjU2MTlGMzY3YzVBYUM3ZDQyRjU3MUI2MTE3NycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIGFzc2VydGlvbnMsXG4gICAgICApXG4gICAgfSlcbiAgfSxcblxuICBiaXRjb2luX2Nhc2hfbWFpbm5ldDogKGV4ZWN1dGUpID0+IHtcbiAgICBkZXNjcmliZSgnaXQgc2hvdWxkIHN1cHBvcnQgYml0Y29pbiBjYXNoIG1haW5uZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdCQ0ggbWFpbm5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2JjaCcsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICdxcDN3anBhM3RqbGowNDJ6Mnd2N2hhaHNsZGd3aHd5MHJxOXN5d2pweXknLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgYml0Y29pbl9jYXNoX3Rlc3RuZXQ6IChleGVjdXRlKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2l0IHNob3VsZCBzdXBwb3J0IGJpdGNvaW4gY2FzaCB0ZXN0bmV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgYXNzZXJ0aW9ucyA9IChyZXF1ZXN0OiBhbnksIHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgbnVtQWRkciA9IHJlcXVlc3Q/LnRlc3REYXRhPy5kYXRhPy5yZXN1bHQubGVuZ3RoXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgfVxuXG4gICAgICBzdWNjZXNzZXMoXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQkNIIHRlc3RuZXQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdiY2gnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ3Rlc3RuZXQnLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnbXVMcWRIdnl2YmJCOW96NHhuV290RXVHVlZlSnRRWlF4eCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIGFzc2VydGlvbnMsXG4gICAgICApXG4gICAgfSlcbiAgfSxcblxuICBiaXRjb2luX3N2X21haW5uZXQ6IChleGVjdXRlKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2l0IHNob3VsZCBzdXBwb3J0IGJpdGNvaW4gc3YgbWFpbm5ldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2VydGlvbnMgPSAocmVxdWVzdDogYW55LCByZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG51bUFkZHIgPSByZXF1ZXN0Py50ZXN0RGF0YT8uZGF0YT8ucmVzdWx0Lmxlbmd0aFxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgIH1cblxuICAgICAgc3VjY2Vzc2VzKFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0JUQyBTViBtYWlubmV0JyxcbiAgICAgICAgICAgIHRlc3REYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludDogJ2JhbGFuY2UnLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb2luOiAnYnRzdicsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICcxSHcyazJpdWh6Y3JBMVJ2bTZFdUNvaUNTcDdTYzZtZHJ2JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgYXNzZXJ0aW9ucyxcbiAgICAgIClcbiAgICB9KVxuICB9LFxuXG4gIGJpdGNvaW5fc3ZfdGVzdG5ldDogKGV4ZWN1dGUpID0+IHtcbiAgICBkZXNjcmliZSgnaXQgc2hvdWxkIHN1cHBvcnQgYml0Y29pbiBzdiB0ZXN0bmV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgYXNzZXJ0aW9ucyA9IChyZXF1ZXN0OiBhbnksIHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgbnVtQWRkciA9IHJlcXVlc3Q/LnRlc3REYXRhPy5kYXRhPy5yZXN1bHQubGVuZ3RoXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgfVxuXG4gICAgICBzdWNjZXNzZXMoXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQlRDIFNWIHRlc3RuZXQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdidHN2JyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICd0ZXN0bmV0JyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ3F6bHFwbG40azk5NXdzamxobDlkY3c2a2Fjd3YwNmthNjU4MHdhdnBscicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIGFzc2VydGlvbnMsXG4gICAgICApXG4gICAgfSlcbiAgfSxcblxuICBsaXRlY29pbl9tYWlubmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCBsaXRlY29pbiBtYWlubmV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgYXNzZXJ0aW9ucyA9IChyZXF1ZXN0OiBhbnksIHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgbnVtQWRkciA9IHJlcXVlc3Q/LnRlc3REYXRhPy5kYXRhPy5yZXN1bHQubGVuZ3RoXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgfVxuXG4gICAgICBzdWNjZXNzZXMoXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTFRDIG1haW5uZXQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdsdGMnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ21haW5uZXQnLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnTThUMUIyWjk3Z1Zkdm1ma1FjQXRZYkVlcHVuZTF0ekd1YScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIGFzc2VydGlvbnMsXG4gICAgICApXG4gICAgfSlcbiAgfSxcblxuICBsaXRlY29pbl90ZXN0bmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCBsaXRlY29pbiB0ZXN0bmV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgYXNzZXJ0aW9ucyA9IChyZXF1ZXN0OiBhbnksIHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgbnVtQWRkciA9IHJlcXVlc3Q/LnRlc3REYXRhPy5kYXRhPy5yZXN1bHQubGVuZ3RoXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgfVxuXG4gICAgICBzdWNjZXNzZXMoXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTFRDIHRlc3RuZXQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdsdGMnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ3Rlc3RuZXQnLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnMk4yUEpFdWNmNlFZMmtORnVKNGNoUUVCb3laV3N6UlFFMTYnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgemNhc2hfbWFpbm5ldDogKGV4ZWN1dGUpID0+IHtcbiAgICBkZXNjcmliZSgnaXQgc2hvdWxkIHN1cHBvcnQgemNhc2ggbWFpbm5ldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2VydGlvbnMgPSAocmVxdWVzdDogYW55LCByZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG51bUFkZHIgPSByZXF1ZXN0Py50ZXN0RGF0YT8uZGF0YT8ucmVzdWx0Lmxlbmd0aFxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgIH1cblxuICAgICAgc3VjY2Vzc2VzKFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1pFQyBtYWlubmV0JyxcbiAgICAgICAgICAgIHRlc3REYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludDogJ2JhbGFuY2UnLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb2luOiAnemVjJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICdtYWlubmV0JyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ3QxVlNoSEFoc1FjNVJWbmRRTHlNMVpiUVhMSEtkMzVHa0cxJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgYXNzZXJ0aW9ucyxcbiAgICAgIClcbiAgICB9KVxuICB9LFxuXG4gIHpjYXNoX3Rlc3RuZXQ6IChleGVjdXRlKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2l0IHNob3VsZCBzdXBwb3J0IHpjYXNoIHRlc3RuZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdaRUMgdGVzdG5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ3plYycsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAndGVzdG5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICd0bUE2NHZlQlZlR1ZlNTNNaksyQUFBZFJvMlM0TUFxczJvVScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIGFzc2VydGlvbnMsXG4gICAgICApXG4gICAgfSlcbiAgfSxcblxuICBkb2dlX21haW5uZXQ6IChleGVjdXRlKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2l0IHNob3VsZCBzdXBwb3J0IGRvZ2UgbWFpbm5ldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2VydGlvbnMgPSAocmVxdWVzdDogYW55LCByZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG51bUFkZHIgPSByZXF1ZXN0Py50ZXN0RGF0YT8uZGF0YT8ucmVzdWx0Lmxlbmd0aFxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgIH1cblxuICAgICAgc3VjY2Vzc2VzKFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0RPR0UgbWFpbm5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2RvZ2UnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ21haW5uZXQnLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnREg1eWFpZXFvWk4zNmZEVmNpTnlSdWVSR3ZHTFIzbXI3TCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIGFzc2VydGlvbnMsXG4gICAgICApXG4gICAgfSlcbiAgfSxcblxuICBkb2dlX3Rlc3RuZXQ6IChleGVjdXRlKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2l0IHNob3VsZCBzdXBwb3J0IGRvZ2UgdGVzdG5ldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2VydGlvbnMgPSAocmVxdWVzdDogYW55LCByZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG51bUFkZHIgPSByZXF1ZXN0Py50ZXN0RGF0YT8uZGF0YT8ucmVzdWx0Lmxlbmd0aFxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgIH1cblxuICAgICAgc3VjY2Vzc2VzKFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0RPR0UgdGVzdG5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2RvZ2UnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbjogJ3Rlc3RuZXQnLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnMk10RjY1Wmhya3FzSHNOb0Z0QTkxZTFBZHZlcVhMTXZTNU0nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgemlsbGlxYV9tYWlubmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCB6aWxsaXFhIG1haW5uZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdaSUwgbWFpbm5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ3ppbCcsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICd6aWwxNmNnY3phbmZ3M21sNXc1cnV0ZzdweXJuY2R4NnVlNHhjZ3Q2Z2cnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgemlsbGlxYV90ZXN0bmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCB6aWxsaXFhIHRlc3RuZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdaSUwgdGVzdG5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ3ppbCcsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAndGVzdG5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICd6aWwxcXd6eTBrYzdwNWdnNHhuNDRkNHlzZmo5cjVwNDl5ZHN5Z2R4dTQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgZGFzaF9tYWlubmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCBkYXNoIG1haW5uZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdET0dFIG1haW5uZXQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdkYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICdtYWlubmV0JyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ1hvMnc2VDFQamdhWjRQSExjb2NldWVBUVppZmREUTVWaUQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgZGFzaF90ZXN0bmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCBkYXNoIHRlc3RuZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdET0dFIHRlc3RuZXQnLFxuICAgICAgICAgICAgdGVzdERhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnYmFsYW5jZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW46ICdkYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICd0ZXN0bmV0JyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ3lMZWduU0VBODNUVGZvNjdYWExhc3pMVWN4WVFDckxqd0gnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgZXRoZXJldW1fY2xhc3NpY19tYWlubmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCBldGhlcmV1bV9jbGFzc2ljIG1haW5uZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdFVEMgbWFpbm5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2V0YycsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAnbWFpbm5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICcweGQ2MDU0NzQ2YTQzZTNhNWM0N2ExODc5NmRjNDc0Mzc1NzQxMjc1NjEnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgZXRoZXJldW1fY2xhc3NpY190ZXN0bmV0OiAoZXhlY3V0ZSkgPT4ge1xuICAgIGRlc2NyaWJlKCdpdCBzaG91bGQgc3VwcG9ydCBldGhlcmV1bV9jbGFzc2ljIHRlc3RuZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NlcnRpb25zID0gKHJlcXVlc3Q6IGFueSwgcmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBudW1BZGRyID0gcmVxdWVzdD8udGVzdERhdGE/LmRhdGE/LnJlc3VsdC5sZW5ndGhcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5yZXN1bHQubGVuZ3RoKSkudG9CZUdyZWF0ZXJUaGFuKDApXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UuZGF0YS5yZXN1bHQubGVuZ3RoKSkudG9FcXVhbChudW1BZGRyKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICB9XG5cbiAgICAgIHN1Y2Nlc3NlcyhcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdFVEMgdGVzdG5ldCcsXG4gICAgICAgICAgICB0ZXN0RGF0YToge1xuICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjogJ2V0YycsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluOiAndGVzdG5ldCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICcweERmN0Q3ZTA1MzkzM2I1Y0MyNDM3MmY4NzhjOTBFNjJkQURBRDVkNDInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG5cbiAgZ3JvZXN0bGNvaW5fbWFpbm5ldDogKGV4ZWN1dGUpID0+IHtcbiAgICBkZXNjcmliZSgnaXQgc2hvdWxkIHN1cHBvcnQgZ3JvZXN0bGNvaW4gbWFpbm5ldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2VydGlvbnMgPSAocmVxdWVzdDogYW55LCByZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG51bUFkZHIgPSByZXF1ZXN0Py50ZXN0RGF0YT8uZGF0YT8ucmVzdWx0Lmxlbmd0aFxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLmRhdGEucmVzdWx0Lmxlbmd0aCkpLnRvQmVHcmVhdGVyVGhhbigwKVxuICAgICAgICBleHBlY3QoTnVtYmVyKHJlc3BvbnNlLnJlc3VsdC5sZW5ndGgpKS50b0JlR3JlYXRlclRoYW4oMClcbiAgICAgICAgZXhwZWN0KE51bWJlcihyZXNwb25zZS5kYXRhLnJlc3VsdC5sZW5ndGgpKS50b0VxdWFsKG51bUFkZHIpXG4gICAgICAgIGV4cGVjdChOdW1iZXIocmVzcG9uc2UucmVzdWx0Lmxlbmd0aCkpLnRvRXF1YWwobnVtQWRkcilcbiAgICAgIH1cblxuICAgICAgc3VjY2Vzc2VzKFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0dSUyBtYWlubmV0JyxcbiAgICAgICAgICAgIHRlc3REYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludDogJ2JhbGFuY2UnLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb2luOiAnZ3JzJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW46ICdtYWlubmV0JyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogJ0ZhaTdMOU1KSGE1OE5CZTRSUzRzNGZvWG1CZU15TjZON2EnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBleGVjdXRlLFxuICAgICAgICBhc3NlcnRpb25zLFxuICAgICAgKVxuICAgIH0pXG4gIH0sXG59XG5cbnR5cGUgTmV0d29yayA9XG4gIHwgJ2JpdGNvaW5fbWFpbm5ldCdcbiAgfCAnYml0Y29pbl90ZXN0bmV0J1xuICB8ICdldGhlcmV1bV9tYWlubmV0J1xuICB8ICdldGhlcmV1bV90ZXN0bmV0J1xuICB8ICdiaXRjb2luX2Nhc2hfbWFpbm5ldCdcbiAgfCAnYml0Y29pbl9jYXNoX3Rlc3RuZXQnXG4gIHwgJ2JpdGNvaW5fc3ZfbWFpbm5ldCdcbiAgfCAnYml0Y29pbl9zdl90ZXN0bmV0J1xuICB8ICdldGhlcmV1bV9jbGFzc2ljX21haW5uZXQnXG4gIHwgJ2V0aGVyZXVtX2NsYXNzaWNfdGVzdG5ldCdcbiAgfCAnbGl0ZWNvaW5fbWFpbm5ldCdcbiAgfCAnbGl0ZWNvaW5fdGVzdG5ldCdcbiAgfCAnemNhc2hfbWFpbm5ldCdcbiAgfCAnemNhc2hfdGVzdG5ldCdcbiAgfCAnemlsbGlxYV9tYWlubmV0J1xuICB8ICd6aWxsaXFhX3Rlc3RuZXQnXG4gIHwgJ2RvZ2VfbWFpbm5ldCdcbiAgfCAnZG9nZV90ZXN0bmV0J1xuICB8ICdkYXNoX21haW5uZXQnXG4gIHwgJ2Rhc2hfdGVzdG5ldCdcbiAgfCAnZ3JvZXN0bGNvaW5fbWFpbm5ldCdcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZEJlaGF2ZUxpa2VCYWxhbmNlQWRhcHRlcihleGVjdXRlOiBFeGVjdXRlLCBuZXR3b3JrczogTmV0d29ya1tdKSB7XG4gIGJhc2UoZXhlY3V0ZSlcblxuICBmb3IgKGNvbnN0IG5ldHdvcmsgb2YgbmV0d29ya3MpIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBleHRlbnNpb25zW25ldHdvcmtdXG4gICAgaWYgKGV4dGVuc2lvbikgZXh0ZW5zaW9uKGV4ZWN1dGUpXG4gIH1cbn1cbiJdfQ==