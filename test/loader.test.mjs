import compiler from './compiler.mjs';

test('Outputs valid data', async () => {
    const stats = await compiler('example-manifest.json', { });
    const output = stats.toJson({ source: true }).modules[0].source;
  
    expect((() => JSON.parse(output))).not.toThrow();
  
    const parsed = JSON.parse(output);
    expect(parsed.icons[0].src).toMatch(/^\/some-publicpath\/[a-f0-9]*\.png$/);
    expect(parsed.icons[1].src).toMatch(/^\/some-publicpath\/[a-f0-9]*\.png$/);
    expect(parsed.icons[2].src).toMatch(/^\/some-publicpath\/[a-f0-9]*\.svg$/);
});


