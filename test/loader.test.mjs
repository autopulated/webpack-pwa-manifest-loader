import compiler from './compiler.mjs';

test('Outputs valid data', async () => {
    const stats = await compiler('example-manifest.json');
    const output = stats.toJson({ source: true }).modules[0].source;

    expect((() => JSON.parse(output))).not.toThrow();

    const parsed = JSON.parse(output);
    expect(parsed.icons[0].src).toEqual('/some-publicpath/icon-72-processed.png');
    expect(parsed.icons[1].src).toEqual('/some-publicpath/icon-180-processed.png');
    expect(parsed.icons[2].src).toEqual('/some-publicpath/icon-svg-processed.svg');

    expect(parsed.screenshots[0].src).toEqual('/some-publicpath/screen-processed.png');
});

test('Invalid manifest', async () => {
    const resultPromise = compiler('malformed-manifest.json', { });

    expect.assertions(3);
    await resultPromise.catch((errors) => {
        expect(errors).toHaveLength(1);
        expect(errors[0].message).toMatch(/^Module build failed/);
        expect(errors[0].message).toMatch(/SyntaxError: Expected property name or '}' in JSON at position 6/);
    });
});

test('Invalid manifest: no src', async () => {
    // make sure we don't throw an error on this
    const stats = await compiler('srcabsent-manifest.json');
    const output = stats.toJson({ source: true }).modules[0].source;

    expect((() => JSON.parse(output))).not.toThrow();

    const parsed = JSON.parse(output);
    expect(parsed.icons[0]).not.toHaveProperty('src');
    expect(parsed.screenshots[0]).not.toHaveProperty('src');
});

test('Missing resources', async () => {
    const resultPromise = compiler('srcmissing-manifest.json', { });

    expect.assertions(3);
    await resultPromise.catch((errors) => {
        expect(errors).toHaveLength(2);
        expect(errors[0].message).toMatch(/^Module not found: Error: Can't resolve/);
        expect(errors[0].loc).toMatch(/missing\.png$/);
    });
});

