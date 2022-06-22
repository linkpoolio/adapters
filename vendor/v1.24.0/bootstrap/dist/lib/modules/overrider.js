"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overrider = void 0;
const _1 = require(".");
const logger_1 = require("./logger");
class Overrider {
    constructor(internalOverrides, inputOverrides, adapterName, jobRunID) {
        this.performOverrides = (requestedSymbols) => {
            const overriddenSyms = {};
            const remainingSyms = [];
            const reqSyms = Array.isArray(requestedSymbols) ? requestedSymbols : [requestedSymbols];
            for (const sym of reqSyms) {
                if (this.adapterOverrides[sym])
                    overriddenSyms[sym] = this.adapterOverrides[sym];
                else
                    remainingSyms.push(sym);
            }
            return [overriddenSyms, remainingSyms];
        };
        this.combineOverrides = (internalOverrides, inputOverrides) => {
            const combinedOverrides = internalOverrides || {};
            for (const symbol of Object.keys(inputOverrides)) {
                combinedOverrides[symbol] = inputOverrides[symbol];
            }
            return combinedOverrides;
        };
        internalOverrides = internalOverrides || {};
        inputOverrides = inputOverrides || {};
        if (!Overrider.isOverrideObj(internalOverrides))
            throw new _1.AdapterError({
                jobRunID,
                statusCode: 400,
                message: 'Overrider: Internal overrides are invalid.',
            });
        if (!Overrider.isOverrideObj(inputOverrides))
            throw Error('Overrider: Input overrides are invalid.');
        this.internalOverrides = internalOverrides;
        this.inputOverrides = inputOverrides;
        this.adapterName = adapterName.toLowerCase();
        this.adapterOverrides = this.combineOverrides(internalOverrides?.[this.adapterName] || {}, inputOverrides?.[this.adapterName] || {});
    }
}
exports.Overrider = Overrider;
Overrider.convertRemainingSymbolsToIds = (overriddenCoins = {}, remainingSyms, coinsResponse) => {
    const isConverted = {};
    const alreadyWarned = {};
    const remainingSymsMap = {};
    for (const remainingSym of remainingSyms) {
        remainingSymsMap[remainingSym.toUpperCase()] = true;
    }
    for (const coinResponse of coinsResponse) {
        const symbol = coinResponse.symbol.toUpperCase();
        if (!remainingSymsMap[symbol])
            continue;
        if (!isConverted[symbol] && !overriddenCoins[symbol]) {
            overriddenCoins[symbol] = coinResponse.id;
            isConverted[symbol] = true;
        }
        else if (isConverted[symbol] && !alreadyWarned[symbol]) {
            logger_1.logger.debug(`Overrider: The symbol "${coinResponse.symbol}" has a duplicate coin id and no override.`);
            alreadyWarned[symbol] = true;
        }
    }
    for (const remainingSym of remainingSyms) {
        if (!isConverted[remainingSym.toUpperCase()]) {
            throw Error(`Overrider: Could not find a matching coin id for the symbol '${remainingSym}'.`);
        }
    }
    return overriddenCoins;
};
/** Creates an object that maps from the overridden symbol/id
    to the symbol that was originally requested */
Overrider.invertRequestedCoinsObject = (requestedCoins) => {
    const invertedCoinsObject = {};
    for (const [symbol, id] of Object.entries(requestedCoins)) {
        invertedCoinsObject[id] = symbol;
    }
    return invertedCoinsObject;
};
Overrider.isOverrideObj = (obj) => {
    if (typeof obj !== 'object' || Array.isArray(obj))
        return false;
    const overrideObj = obj;
    for (const adapterName of Object.keys(overrideObj)) {
        if (typeof adapterName !== 'string')
            return false;
        const adapterOverrides = overrideObj[adapterName];
        if (typeof adapterOverrides !== 'object' || Array.isArray(adapterOverrides))
            return false;
        for (const symbol of Object.keys(adapterOverrides)) {
            if (typeof symbol !== 'string' || typeof adapterOverrides[symbol] !== 'string')
                return false;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnJpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tb2R1bGVzL292ZXJyaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3QkFBZ0M7QUFDaEMscUNBQWlDO0FBRWpDLE1BQWEsU0FBUztJQU1wQixZQUNFLGlCQUEwQixFQUMxQixjQUF1QixFQUN2QixXQUFtQixFQUNuQixRQUFnQjtRQXFCbEIscUJBQWdCLEdBQUcsQ0FBQyxnQkFBa0MsRUFBdUMsRUFBRTtZQUM3RixNQUFNLGNBQWMsR0FBb0IsRUFBRSxDQUFBO1lBQzFDLE1BQU0sYUFBYSxHQUFxQixFQUFFLENBQUE7WUFDMUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ3ZGLEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO2dCQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7b0JBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTs7b0JBQzNFLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDN0I7WUFDRCxPQUFPLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQTtRQWdFTyxxQkFBZ0IsR0FBRyxDQUN6QixpQkFBbUMsRUFDbkMsY0FBZ0MsRUFDZCxFQUFFO1lBQ3BCLE1BQU0saUJBQWlCLEdBQUcsaUJBQWlCLElBQUksRUFBRSxDQUFBO1lBQ2pELEtBQUssTUFBTSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDaEQsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1B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QyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUE7S0FDakM7SUFDRCxPQUFPLG1CQUFtQixDQUFBO0FBQzVCLENBQUMsQ0FBQTtBQUVNLHVCQUFhLEdBQUcsQ0FBQyxHQUFZLEVBQXNCLEVBQUU7SUFDMUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUMvRCxNQUFNLFdBQVcsR0FBRyxHQUFrQixDQUFBO0lBQ3RDLEtBQUssTUFBTSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNsRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUNqRCxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNqRCxJQUFJLE9BQU8sZ0JBQWdCLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUN6RixLQUFLLE1BQU0sTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNsRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxLQUFLLENBQUE7U0FDN0Y7S0FDRjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDb2luc1Jlc3BvbnNlIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IEFkYXB0ZXJFcnJvciB9IGZyb20gJy4nXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIE92ZXJyaWRlciB7XG4gIGFkYXB0ZXJOYW1lOiBzdHJpbmdcbiAgYWRhcHRlck92ZXJyaWRlczogQWRhcHRlck92ZXJyaWRlc1xuICBpbnRlcm5hbE92ZXJyaWRlczogT3ZlcnJpZGVPYmpcbiAgaW5wdXRPdmVycmlkZXM6IE92ZXJyaWRlT2JqXG5cbiAgY29uc3RydWN0b3IoXG4gICAgaW50ZXJuYWxPdmVycmlkZXM6IHVua25vd24sXG4gICAgaW5wdXRPdmVycmlkZXM6IHVua25vd24sXG4gICAgYWRhcHRlck5hbWU6IHN0cmluZyxcbiAgICBqb2JSdW5JRDogc3RyaW5nLFxuICApIHtcbiAgICBpbnRlcm5hbE92ZXJyaWRlcyA9IGludGVybmFsT3ZlcnJpZGVzIHx8IHt9XG4gICAgaW5wdXRPdmVycmlkZXMgPSBpbnB1dE92ZXJyaWRlcyB8fCB7fVxuICAgIGlmICghT3ZlcnJpZGVyLmlzT3ZlcnJpZGVPYmooaW50ZXJuYWxPdmVycmlkZXMpKVxuICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgIGpvYlJ1bklELFxuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIG1lc3NhZ2U6ICdPdmVycmlkZXI6IEludGVybmFsIG92ZXJyaWRlcyBhcmUgaW52YWxpZC4nLFxuICAgICAgfSlcbiAgICBpZiAoIU92ZXJyaWRlci5pc092ZXJyaWRlT2JqKGlucHV0T3ZlcnJpZGVzKSlcbiAgICAgIHRocm93IEVycm9yKCdPdmVycmlkZXI6IElucHV0IG92ZXJyaWRlcyBhcmUgaW52YWxpZC4nKVxuICAgIHRoaXMuaW50ZXJuYWxPdmVycmlkZXMgPSBpbnRlcm5hbE92ZXJyaWRlc1xuICAgIHRoaXMuaW5wdXRPdmVycmlkZXMgPSBpbnB1dE92ZXJyaWRlc1xuICAgIHRoaXMuYWRhcHRlck5hbWUgPSBhZGFwdGVyTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgdGhpcy5hZGFwdGVyT3ZlcnJpZGVzID0gdGhpcy5jb21iaW5lT3ZlcnJpZGVzKFxuICAgICAgaW50ZXJuYWxPdmVycmlkZXM/Llt0aGlzLmFkYXB0ZXJOYW1lXSB8fCB7fSxcbiAgICAgIGlucHV0T3ZlcnJpZGVzPy5bdGhpcy5hZGFwdGVyTmFtZV0gfHwge30sXG4gICAgKVxuICB9XG5cbiAgcGVyZm9ybU92ZXJyaWRlcyA9IChyZXF1ZXN0ZWRTeW1ib2xzOiBSZXF1ZXN0ZWRTeW1ib2xzKTogW092ZXJyaWRkZW5Db2lucywgUmVtYWluaW5nU3ltYm9sc10gPT4ge1xuICAgIGNvbnN0IG92ZXJyaWRkZW5TeW1zOiBPdmVycmlkZGVuQ29pbnMgPSB7fVxuICAgIGNvbnN0IHJlbWFpbmluZ1N5bXM6IFJlbWFpbmluZ1N5bWJvbHMgPSBbXVxuICAgIGNvbnN0IHJlcVN5bXMgPSBBcnJheS5pc0FycmF5KHJlcXVlc3RlZFN5bWJvbHMpID8gcmVxdWVzdGVkU3ltYm9scyA6IFtyZXF1ZXN0ZWRTeW1ib2xzXVxuICAgIGZvciAoY29uc3Qgc3ltIG9mIHJlcVN5bXMpIHtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJPdmVycmlkZXNbc3ltXSkgb3ZlcnJpZGRlblN5bXNbc3ltXSA9IHRoaXMuYWRhcHRlck92ZXJyaWRlc1tzeW1dXG4gICAgICBlbHNlIHJlbWFpbmluZ1N5bXMucHVzaChzeW0pXG4gICAgfVxuICAgIHJldHVybiBbb3ZlcnJpZGRlblN5bXMsIHJlbWFpbmluZ1N5bXNdXG4gIH1cblxuICBzdGF0aWMgY29udmVydFJlbWFpbmluZ1N5bWJvbHNUb0lkcyA9IChcbiAgICBvdmVycmlkZGVuQ29pbnM6IE92ZXJyaWRkZW5Db2lucyA9IHt9LFxuICAgIHJlbWFpbmluZ1N5bXM6IFJlcXVlc3RlZFN5bWJvbHMsXG4gICAgY29pbnNSZXNwb25zZTogQ29pbnNSZXNwb25zZVtdLFxuICApOiBSZXF1ZXN0ZWRDb2lucyA9PiB7XG4gICAgY29uc3QgaXNDb252ZXJ0ZWQ6IHsgW3N5bWJvbDogc3RyaW5nXTogYm9vbGVhbiB9ID0ge31cbiAgICBjb25zdCBhbHJlYWR5V2FybmVkOiB7IFtzeW1ib2w6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9XG4gICAgY29uc3QgcmVtYWluaW5nU3ltc01hcDogeyBbc3ltYm9sOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fVxuICAgIGZvciAoY29uc3QgcmVtYWluaW5nU3ltIG9mIHJlbWFpbmluZ1N5bXMpIHtcbiAgICAgIHJlbWFpbmluZ1N5bXNNYXBbcmVtYWluaW5nU3ltLnRvVXBwZXJDYXNlKCldID0gdHJ1ZVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgY29pblJlc3BvbnNlIG9mIGNvaW5zUmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHN5bWJvbCA9IGNvaW5SZXNwb25zZS5zeW1ib2wudG9VcHBlckNhc2UoKVxuICAgICAgaWYgKCFyZW1haW5pbmdTeW1zTWFwW3N5bWJvbF0pIGNvbnRpbnVlXG4gICAgICBpZiAoIWlzQ29udmVydGVkW3N5bWJvbF0gJiYgIW92ZXJyaWRkZW5Db2luc1tzeW1ib2xdKSB7XG4gICAgICAgIG92ZXJyaWRkZW5Db2luc1tzeW1ib2xdID0gY29pblJlc3BvbnNlLmlkXG4gICAgICAgIGlzQ29udmVydGVkW3N5bWJvbF0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKGlzQ29udmVydGVkW3N5bWJvbF0gJiYgIWFscmVhZHlXYXJuZWRbc3ltYm9sXSkge1xuICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgYE92ZXJyaWRlcjogVGhlIHN5bWJvbCBcIiR7Y29pblJlc3BvbnNlLnN5bWJvbH1cIiBoYXMgYSBkdXBsaWNhdGUgY29pbiBpZCBhbmQgbm8gb3ZlcnJpZGUuYCxcbiAgICAgICAgKVxuICAgICAgICBhbHJlYWR5V2FybmVkW3N5bWJvbF0gPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByZW1haW5pbmdTeW0gb2YgcmVtYWluaW5nU3ltcykge1xuICAgICAgaWYgKCFpc0NvbnZlcnRlZFtyZW1haW5pbmdTeW0udG9VcHBlckNhc2UoKV0pIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYE92ZXJyaWRlcjogQ291bGQgbm90IGZpbmQgYSBtYXRjaGluZyBjb2luIGlkIGZvciB0aGUgc3ltYm9sICcke3JlbWFpbmluZ1N5bX0nLmAsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG92ZXJyaWRkZW5Db2luc1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYW4gb2JqZWN0IHRoYXQgbWFwcyBmcm9tIHRoZSBvdmVycmlkZGVuIHN5bWJvbC9pZFxuICAgICAgdG8gdGhlIHN5bWJvbCB0aGF0IHdhcyBvcmlnaW5hbGx5IHJlcXVlc3RlZCAqL1xuICBzdGF0aWMgaW52ZXJ0UmVxdWVzdGVkQ29pbnNPYmplY3QgPSAoXG4gICAgcmVxdWVzdGVkQ29pbnM6IFJlcXVlc3RlZENvaW5zLFxuICApOiBPdmVycmlkZVRvT3JpZ2luYWxTeW1ib2wgPT4ge1xuICAgIGNvbnN0IGludmVydGVkQ29pbnNPYmplY3Q6IE92ZXJyaWRlVG9PcmlnaW5hbFN5bWJvbCA9IHt9XG4gICAgZm9yIChjb25zdCBbc3ltYm9sLCBpZF0gb2YgT2JqZWN0LmVudHJpZXMocmVxdWVzdGVkQ29pbnMpKSB7XG4gICAgICBpbnZlcnRlZENvaW5zT2JqZWN0W2lkXSA9IHN5bWJvbFxuICAgIH1cbiAgICByZXR1cm4gaW52ZXJ0ZWRDb2luc09iamVjdFxuICB9XG5cbiAgc3RhdGljIGlzT3ZlcnJpZGVPYmogPSAob2JqOiB1bmtub3duKTogb2JqIGlzIE92ZXJyaWRlT2JqID0+IHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShvYmopKSByZXR1cm4gZmFsc2VcbiAgICBjb25zdCBvdmVycmlkZU9iaiA9IG9iaiBhcyBPdmVycmlkZU9ialxuICAgIGZvciAoY29uc3QgYWRhcHRlck5hbWUgb2YgT2JqZWN0LmtleXMob3ZlcnJpZGVPYmopKSB7XG4gICAgICBpZiAodHlwZW9mIGFkYXB0ZXJOYW1lICE9PSAnc3RyaW5nJykgcmV0dXJuIGZhbHNlXG4gICAgICBjb25zdCBhZGFwdGVyT3ZlcnJpZGVzID0gb3ZlcnJpZGVPYmpbYWRhcHRlck5hbWVdXG4gICAgICBpZiAodHlwZW9mIGFkYXB0ZXJPdmVycmlkZXMgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoYWRhcHRlck92ZXJyaWRlcykpIHJldHVybiBmYWxzZVxuICAgICAgZm9yIChjb25zdCBzeW1ib2wgb2YgT2JqZWN0LmtleXMoYWRhcHRlck92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzeW1ib2wgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhZGFwdGVyT3ZlcnJpZGVzW3N5bWJvbF0gIT09ICdzdHJpbmcnKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHByaXZhdGUgY29tYmluZU92ZXJyaWRlcyA9IChcbiAgICBpbnRlcm5hbE92ZXJyaWRlczogQWRhcHRlck92ZXJyaWRlcyxcbiAgICBpbnB1dE92ZXJyaWRlczogQWRhcHRlck92ZXJyaWRlcyxcbiAgKTogQWRhcHRlck92ZXJyaWRlcyA9PiB7XG4gICAgY29uc3QgY29tYmluZWRPdmVycmlkZXMgPSBpbnRlcm5hbE92ZXJyaWRlcyB8fCB7fVxuICAgIGZvciAoY29uc3Qgc3ltYm9sIG9mIE9iamVjdC5rZXlzKGlucHV0T3ZlcnJpZGVzKSkge1xuICAgICAgY29tYmluZWRPdmVycmlkZXNbc3ltYm9sXSA9IGlucHV0T3ZlcnJpZGVzW3N5bWJvbF1cbiAgICB9XG4gICAgcmV0dXJuIGNvbWJpbmVkT3ZlcnJpZGVzXG4gIH1cbn1cblxudHlwZSBBZGFwdGVyT3ZlcnJpZGVzID0ge1xuICBbc3ltYm9sOiBzdHJpbmddOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgT3ZlcnJpZGVPYmogPSB7XG4gIFthZGFwdGVyTmFtZTogc3RyaW5nXTogQWRhcHRlck92ZXJyaWRlc1xufVxuXG50eXBlIE92ZXJyaWRkZW5Db2lucyA9IHtcbiAgW3N5bWJvbDogc3RyaW5nXTogc3RyaW5nXG59XG5cbnR5cGUgUmVxdWVzdGVkQ29pbnMgPSB7XG4gIFtzeW1ib2w6IHN0cmluZ106IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBPdmVycmlkZVRvT3JpZ2luYWxTeW1ib2wgPSB7XG4gIFtpZDogc3RyaW5nXTogc3RyaW5nXG59XG5cbnR5cGUgUmVxdWVzdGVkU3ltYm9scyA9IHN0cmluZyB8IHN0cmluZ1tdXG5cbnR5cGUgUmVtYWluaW5nU3ltYm9scyA9IHN0cmluZ1tdXG4iXX0=