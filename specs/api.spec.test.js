
const baseUrl = 'https://bookstore.demoqa.com';
const testUserName = `shipwnov${Math.random()}`;
const testPassword = "test1AS#";
const invalidUserName = "shipwunovqq";
const shortPassword = "test";
const alreadyUsedUserName = "shipwnov";

const performRequest = async (url, method, body) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return {
        status: response.status,
        data: await response.json()
    };
};

describe('Создание пользователя)', () => {
    it('Создание пользователя c ошибкой, пароль не подходит', async () => {
        const { status } = await performRequest(`${baseUrl}/Account/v1/User`, 'POST', {
            "userName": invalidUserName,
            "password": shortPassword
        });
        expect(status).toBe(400);
    });

    it('Создание пользователя успешно', async () => {
        const { status } = await performRequest(`${baseUrl}/Account/v1/User`, 'POST', {
            "userName": testUserName,
            "password": testPassword
        });
        expect(status).toBe(201);
    });

    it('Создание пользователя c ошибкой, логин уже используется', async () => {
        const { status } = await performRequest(`${baseUrl}/Account/v1/User`, 'POST', {
            "userName": alreadyUsedUserName,
            "password": testPassword
        });
        expect(status).toBe(406);
    });
});

describe('Генерация токена', () => {
    it('Авторизация для генерации токена', async () => {
        const { status } = await performRequest(`${baseUrl}/Account/v1/Authorized`, 'POST', {
            "userName": alreadyUsedUserName,
            "password": testPassword
        });
        expect(status).toBe(200);
    });

    it('Генерация токена успешно', async () => {
        const { status } = await performRequest(`${baseUrl}/Account/v1/GenerateToken`, 'POST', {
            "userName": alreadyUsedUserName,
            "password": testPassword
        });
        expect(status).toBe(200);
    });


    it('Генерация токена c ошибкой', async () => {
        const { status } = await performRequest(`${baseUrl}/Account/v1/GenerateToken`, 'POST', {});
        expect(status).toBe(400);
    });
});

