import path from 'node:path';

// A simple loader to load image src URLs from manifest.json / .webmanifest files
// Supports image src urls in:
//  * .icons[].src
//  * .screenshots[].src
export default async function manifestLoader(source) {
    const callback = this.async();

    const parsedSrc = JSON.parse(source);

    const logger = this.getLogger('pwa-manifest-loader');

    const srcRefs = [];

    // collect promises for the laod of each src url:
    for (let i = 0; i < parsedSrc.icons?.length; i++) {
        if (parsedSrc.icons[i]?.src) {
            const promise = this.importModule(path.resolve(this.context, parsedSrc.icons[i].src)).catch((e) => {
                this.emitError(e);
            });
            srcRefs.push({promise, assignTo: parsedSrc.icons[i]});
        }
    }
    for (let i = 0; i < parsedSrc.screenshots?.length; i++) {
        if (parsedSrc.screenshots[i]?.src) {
            const promise = this.importModule(path.resolve(this.context, parsedSrc.screenshots[i].src)).catch((e) => {
                this.emitError(e);
            });
            srcRefs.push({promise, assignTo: parsedSrc.screenshots[i]});
        }
    }

    // await them each in turn and assign results:
    for( const {promise, assignTo} of srcRefs) {
        const result = await promise;
        logger.log(`pwa-manifest-loader got ${result} for ${assignTo.src} in ${this.context}`);
        assignTo.src = result;
    }

    callback(null, JSON.stringify(parsedSrc));
};
