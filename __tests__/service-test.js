import service from '../src/services/service';

it('testing "service" - async/await', async () => {
    expect.assertions(2);
    const data = await service.get({
        latitude: 41,
        longitude: 69,
    });
    expect(data).toHaveLength(98);
    expect(data).toBeInstanceOf(Array);
});
