import compiler from './compiler.mjs';

test('Outputs valid data', async () => {
    const stats = await compiler('example-manifest.json', { });
    const output = stats.toJson({ source: true }).modules[0].source;

    expect((() => JSON.parse(output))).not.toThrow();

    const parsed = JSON.parse(output);
    expect(parsed.icons[0].src).toEqual('/some-publicpath/icon-72-processed.png');
    expect(parsed.icons[1].src).toEqual('/some-publicpath/icon-180-processed.png');
    expect(parsed.icons[2].src).toEqual('/some-publicpath/icon-svg-processed.svg');

    expect(parsed.screenshots[0].src).toEqual('/some-publicpath/screen-processed.png');
});


