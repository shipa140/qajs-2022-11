
const baseUrl = 'https://bookstore.demoqa.com';


describe('Создание пользователя', () => {
    it('Создание пользователя c ошибкой, пароль не подходит', async () => {
            const response = await fetch(`${baseUrl}/Account/v1/User`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "userName": "shipwunovqq",
                    "password": "test"
                })
            });

            const data = await response.json();
            expect(response.status).toBe(400);
    });

    it('Создание пользователя успешно', async () => {
        const response = await fetch(`${baseUrl}/Account/v1/User`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": `shipwunov${Math.random()}`,
                "password": "test1AS#"
            })
        });

        const data = await response.json();
        expect(response.status).toBe(201);
    });

    it('Создание пользователя c ошибкой, логин уже используется', async () => {
        const response = await fetch(`${baseUrl}/Account/v1/User`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": `shipwnov`,
                "password": "test1AS#"
            })
        });

        const data = await response.json();
        expect(response.status).toBe(406);
    });
});

describe('Генерация токена', () => {
it('авторизация для генирации токена', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/Authorized`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userName": `shipwnov`,
            "password": "test1AS#"
        })
    });

    const data = await response.json();
    expect(response.status).toBe(200);
});

it('Генерация токена успешно', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userName": `shipwnov`,
            "password": "test1AS#"
        })
    });

    const data = await response.json();
    expect(response.status).toBe(200);
});

it('Генерация токена c ошибкой', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();
    expect(response.status).toBe(400);
});
});