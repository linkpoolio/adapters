"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedId = exports.WARMER_FEED_ID = exports.MAX_FEED_ID_LENGTH = void 0;
const tslib_1 = require("tslib");
const modules_1 = require("../modules");
const util_1 = require("../middleware/cache-key/util");
const crypto = tslib_1.__importStar(require("crypto"));
/**
 * Maxiumum number of characters that a feedId can contain.
 */
exports.MAX_FEED_ID_LENGTH = 300;
/**
 * Fixed label value for cache warmer feed_id
 */
exports.WARMER_FEED_ID = 'CACHE_WARMER';
/**
 * Builds a string from the provided data, either a symbol string or an array of them. E.g.:
 *   - "ETH"
 *   - "[BTC|DOGE|ETH]"
 * @param data The input data from validated params
 * @returns {string}
 */
function buildSymbolString(data) {
    if (Array.isArray(data)) {
        if (data.length > 1) {
            return `[${data
                .map((b) => b.toUpperCase())
                .sort((b1, b2) => b1.localeCompare(b2))
                .join('|')}]`;
        }
        else {
            return data[0].toUpperCase();
        }
    }
    return data.toUpperCase();
}
/**
 * Get feed id name based on input params
 * @param input The adapter input request
 * @returns {string}
 */
const getFeedId = (input) => {
    try {
        const commonFeedParams = {
            base: ['base', 'from', 'coin', 'symbol', 'asset'],
            quote: ['quote', 'to', 'convert'],
        };
        // check if string is within array
        const includesCheck = (param) => Object.keys(input.data).includes(param);
        /**
         * If the request is coming from the cache warmer, use a fixed id. This is to reduce the
         * cardinality of the feed_id label in prometheus, which can be overloaded quickly
         */
        if (input.debug?.warmer) {
            return exports.WARMER_FEED_ID;
        }
        // run through validator if input.data object has keys that match potential base and quote parameters
        if (commonFeedParams.base.some(includesCheck) && commonFeedParams.quote.some(includesCheck)) {
            const validationResult = new modules_1.Validator(input, commonFeedParams, {}, { shouldThrowError: false });
            if (validationResult.error) {
                modules_1.logger.debug('Unable to validate feed name', {
                    input,
                    error: validationResult.error.toString(),
                });
                return JSON.stringify(input);
            }
            const { base, quote } = validationResult.validated.data;
            /**
             * With batched requests, the base can either be an array of bases, or a single base.
             * The same type constraints apply to the quote param.
             */
            if (base) {
                return `${buildSymbolString(base)}` + (quote ? `/${buildSymbolString(quote)}` : '');
            }
        }
        const entries = Object.keys(input)
            .filter((prop) => !util_1.excludableAdapterRequestProperties[prop])
            .map((k) => [k, input[k]]);
        const rawFeedId = JSON.stringify(Object.fromEntries(entries));
        // If feedId exceed the max length use the md5 hash
        return rawFeedId.length > exports.MAX_FEED_ID_LENGTH
            ? crypto.createHash('md5').update(rawFeedId).digest('hex')
            : rawFeedId;
    }
    catch (error) {
        modules_1.logger.error('Unable to get feed name', {
            input,
            error: error.toString(),
            stack: error.stack,
        });
        return 'undefined';
    }
};
exports.getFeedId = getFeedId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0cmljcy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSx3Q0FBOEM7QUFDOUMsdURBQWlGO0FBQ2pGLHVEQUFnQztBQUVoQzs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsR0FBRyxDQUFBO0FBRXJDOztHQUVHO0FBQ1UsUUFBQSxjQUFjLEdBQUcsY0FBYyxDQUFBO0FBRTVDOzs7Ozs7R0FNRztBQUNILFNBQVMsaUJBQWlCLENBQUMsSUFBdUI7SUFDaEQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLElBQUk7aUJBQ1osR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ25DLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFBO1NBQ2hCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtTQUM3QjtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDM0IsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQXFCLEVBQVUsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsTUFBTSxnQkFBZ0IsR0FBRztZQUN2QixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1lBQ2pELEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDO1NBQ2xDLENBQUE7UUFFRCxrQ0FBa0M7UUFDbEMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVoRjs7O1dBR0c7UUFDSCxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO1lBQ3ZCLE9BQU8sc0JBQWMsQ0FBQTtTQUN0QjtRQUVELHFHQUFxRztRQUNyRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMzRixNQUFNLGdCQUFnQixHQUFHLElBQUksbUJBQVMsQ0FDcEMsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixFQUFFLEVBQ0YsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FDNUIsQ0FBQTtZQUNELElBQUksZ0JBQWdCLENBQUMsS0FBSyxFQUFFO2dCQUMxQixnQkFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRTtvQkFDM0MsS0FBSztvQkFDTCxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtpQkFDekMsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUM3QjtZQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQTtZQUV2RDs7O2VBR0c7WUFDSCxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNwRjtTQUNGO1FBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDL0IsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLHlDQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFFN0QsbURBQW1EO1FBQ25ELE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRywwQkFBa0I7WUFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUQsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtLQUNkO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxnQkFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRTtZQUN0QyxLQUFLO1lBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDdkIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1NBQ25CLENBQUMsQ0FBQTtRQUNGLE9BQU8sV0FBVyxDQUFBO0tBQ25CO0FBQ0gsQ0FBQyxDQUFBO0FBL0RZLFFBQUEsU0FBUyxhQStEckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyUmVxdWVzdCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBsb2dnZXIsIFZhbGlkYXRvciB9IGZyb20gJy4uL21vZHVsZXMnXG5pbXBvcnQgeyBleGNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vbWlkZGxld2FyZS9jYWNoZS1rZXkvdXRpbCdcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nXG5cbi8qKlxuICogTWF4aXVtdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBhIGZlZWRJZCBjYW4gY29udGFpbi5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BWF9GRUVEX0lEX0xFTkdUSCA9IDMwMFxuXG4vKipcbiAqIEZpeGVkIGxhYmVsIHZhbHVlIGZvciBjYWNoZSB3YXJtZXIgZmVlZF9pZFxuICovXG5leHBvcnQgY29uc3QgV0FSTUVSX0ZFRURfSUQgPSAnQ0FDSEVfV0FSTUVSJ1xuXG4vKipcbiAqIEJ1aWxkcyBhIHN0cmluZyBmcm9tIHRoZSBwcm92aWRlZCBkYXRhLCBlaXRoZXIgYSBzeW1ib2wgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHRoZW0uIEUuZy46XG4gKiAgIC0gXCJFVEhcIlxuICogICAtIFwiW0JUQ3xET0dFfEVUSF1cIlxuICogQHBhcmFtIGRhdGEgVGhlIGlucHV0IGRhdGEgZnJvbSB2YWxpZGF0ZWQgcGFyYW1zXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBidWlsZFN5bWJvbFN0cmluZyhkYXRhOiBzdHJpbmcgfCBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGBbJHtkYXRhXG4gICAgICAgIC5tYXAoKGI6IHN0cmluZykgPT4gYi50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAuc29ydCgoYjEsIGIyKSA9PiBiMS5sb2NhbGVDb21wYXJlKGIyKSlcbiAgICAgICAgLmpvaW4oJ3wnKX1dYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGF0YVswXS50b1VwcGVyQ2FzZSgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGEudG9VcHBlckNhc2UoKVxufVxuXG4vKipcbiAqIEdldCBmZWVkIGlkIG5hbWUgYmFzZWQgb24gaW5wdXQgcGFyYW1zXG4gKiBAcGFyYW0gaW5wdXQgVGhlIGFkYXB0ZXIgaW5wdXQgcmVxdWVzdFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEZlZWRJZCA9IChpbnB1dDogQWRhcHRlclJlcXVlc3QpOiBzdHJpbmcgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbW1vbkZlZWRQYXJhbXMgPSB7XG4gICAgICBiYXNlOiBbJ2Jhc2UnLCAnZnJvbScsICdjb2luJywgJ3N5bWJvbCcsICdhc3NldCddLFxuICAgICAgcXVvdGU6IFsncXVvdGUnLCAndG8nLCAnY29udmVydCddLFxuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHN0cmluZyBpcyB3aXRoaW4gYXJyYXlcbiAgICBjb25zdCBpbmNsdWRlc0NoZWNrID0gKHBhcmFtOiBzdHJpbmcpID0+IE9iamVjdC5rZXlzKGlucHV0LmRhdGEpLmluY2x1ZGVzKHBhcmFtKVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIHJlcXVlc3QgaXMgY29taW5nIGZyb20gdGhlIGNhY2hlIHdhcm1lciwgdXNlIGEgZml4ZWQgaWQuIFRoaXMgaXMgdG8gcmVkdWNlIHRoZVxuICAgICAqIGNhcmRpbmFsaXR5IG9mIHRoZSBmZWVkX2lkIGxhYmVsIGluIHByb21ldGhldXMsIHdoaWNoIGNhbiBiZSBvdmVybG9hZGVkIHF1aWNrbHlcbiAgICAgKi9cbiAgICBpZiAoaW5wdXQuZGVidWc/Lndhcm1lcikge1xuICAgICAgcmV0dXJuIFdBUk1FUl9GRUVEX0lEXG4gICAgfVxuXG4gICAgLy8gcnVuIHRocm91Z2ggdmFsaWRhdG9yIGlmIGlucHV0LmRhdGEgb2JqZWN0IGhhcyBrZXlzIHRoYXQgbWF0Y2ggcG90ZW50aWFsIGJhc2UgYW5kIHF1b3RlIHBhcmFtZXRlcnNcbiAgICBpZiAoY29tbW9uRmVlZFBhcmFtcy5iYXNlLnNvbWUoaW5jbHVkZXNDaGVjaykgJiYgY29tbW9uRmVlZFBhcmFtcy5xdW90ZS5zb21lKGluY2x1ZGVzQ2hlY2spKSB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0ID0gbmV3IFZhbGlkYXRvcihcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGNvbW1vbkZlZWRQYXJhbXMsXG4gICAgICAgIHt9LFxuICAgICAgICB7IHNob3VsZFRocm93RXJyb3I6IGZhbHNlIH0sXG4gICAgICApXG4gICAgICBpZiAodmFsaWRhdGlvblJlc3VsdC5lcnJvcikge1xuICAgICAgICBsb2dnZXIuZGVidWcoJ1VuYWJsZSB0byB2YWxpZGF0ZSBmZWVkIG5hbWUnLCB7XG4gICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgZXJyb3I6IHZhbGlkYXRpb25SZXN1bHQuZXJyb3IudG9TdHJpbmcoKSxcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGlucHV0KVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGJhc2UsIHF1b3RlIH0gPSB2YWxpZGF0aW9uUmVzdWx0LnZhbGlkYXRlZC5kYXRhXG5cbiAgICAgIC8qKlxuICAgICAgICogV2l0aCBiYXRjaGVkIHJlcXVlc3RzLCB0aGUgYmFzZSBjYW4gZWl0aGVyIGJlIGFuIGFycmF5IG9mIGJhc2VzLCBvciBhIHNpbmdsZSBiYXNlLlxuICAgICAgICogVGhlIHNhbWUgdHlwZSBjb25zdHJhaW50cyBhcHBseSB0byB0aGUgcXVvdGUgcGFyYW0uXG4gICAgICAgKi9cbiAgICAgIGlmIChiYXNlKSB7XG4gICAgICAgIHJldHVybiBgJHtidWlsZFN5bWJvbFN0cmluZyhiYXNlKX1gICsgKHF1b3RlID8gYC8ke2J1aWxkU3ltYm9sU3RyaW5nKHF1b3RlKX1gIDogJycpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5rZXlzKGlucHV0KVxuICAgICAgLmZpbHRlcigocHJvcCkgPT4gIWV4Y2x1ZGFibGVBZGFwdGVyUmVxdWVzdFByb3BlcnRpZXNbcHJvcF0pXG4gICAgICAubWFwKChrKSA9PiBbaywgaW5wdXRbayBhcyBrZXlvZiBBZGFwdGVyUmVxdWVzdF1dKVxuXG4gICAgY29uc3QgcmF3RmVlZElkID0gSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmZyb21FbnRyaWVzKGVudHJpZXMpKVxuXG4gICAgLy8gSWYgZmVlZElkIGV4Y2VlZCB0aGUgbWF4IGxlbmd0aCB1c2UgdGhlIG1kNSBoYXNoXG4gICAgcmV0dXJuIHJhd0ZlZWRJZC5sZW5ndGggPiBNQVhfRkVFRF9JRF9MRU5HVEhcbiAgICAgID8gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZShyYXdGZWVkSWQpLmRpZ2VzdCgnaGV4JylcbiAgICAgIDogcmF3RmVlZElkXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKCdVbmFibGUgdG8gZ2V0IGZlZWQgbmFtZScsIHtcbiAgICAgIGlucHV0LFxuICAgICAgZXJyb3I6IGVycm9yLnRvU3RyaW5nKCksXG4gICAgICBzdGFjazogZXJyb3Iuc3RhY2ssXG4gICAgfSlcbiAgICByZXR1cm4gJ3VuZGVmaW5lZCdcbiAgfVxufVxuIl19