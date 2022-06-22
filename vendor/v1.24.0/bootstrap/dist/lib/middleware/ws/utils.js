"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateBatches = void 0;
/**
 * Separates a batched request into indivdual requests and calls a callback function with the individual request passed in
 * @param input The original batched request
 * @param dataFields The input request data object's fields
 * @param callback Callback function that is called after batching is complete
 */
const separateBatches = async (input, callback) => {
    await separateBatchesHelper(input, input, Object.keys(input.data), callback);
};
exports.separateBatches = separateBatches;
const separateBatchesHelper = async (curr, input, dataFields, callback) => {
    if (dataFields.length === 0) {
        await callback(curr);
    }
    else {
        let dataValues = input.data[dataFields[0]];
        if (dataValues != null && dataValues != undefined) {
            dataValues = Array.isArray(dataValues) ? dataValues : [dataValues];
            for (const val of dataValues) {
                const updatedCurr = {
                    ...curr,
                    data: {
                        ...curr.data,
                        [dataFields[0]]: val,
                    },
                };
                await separateBatchesHelper(updatedCurr, input, dataFields.slice(1), callback);
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvd3MvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7Ozs7O0dBS0c7QUFDSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLEtBQXFCLEVBQ3JCLFFBQXdELEVBQ3pDLEVBQUU7SUFDakIsTUFBTSxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzlFLENBQUMsQ0FBQTtBQUxZLFFBQUEsZUFBZSxtQkFLM0I7QUFFRCxNQUFNLHFCQUFxQixHQUFHLEtBQUssRUFDakMsSUFBb0IsRUFDcEIsS0FBcUIsRUFDckIsVUFBb0IsRUFDcEIsUUFBd0QsRUFDekMsRUFBRTtJQUNqQixJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzNCLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3JCO1NBQU07UUFDTCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFDLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFO1lBQ2pELFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDbEUsS0FBSyxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7Z0JBQzVCLE1BQU0sV0FBVyxHQUFHO29CQUNsQixHQUFHLElBQUk7b0JBQ1AsSUFBSSxFQUFFO3dCQUNKLEdBQUcsSUFBSSxDQUFDLElBQUk7d0JBQ1osQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHO3FCQUNyQjtpQkFDRixDQUFBO2dCQUNELE1BQU0scUJBQXFCLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO2FBQy9FO1NBQ0Y7S0FDRjtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJSZXF1ZXN0IH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuLyoqXG4gKiBTZXBhcmF0ZXMgYSBiYXRjaGVkIHJlcXVlc3QgaW50byBpbmRpdmR1YWwgcmVxdWVzdHMgYW5kIGNhbGxzIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgaW5kaXZpZHVhbCByZXF1ZXN0IHBhc3NlZCBpblxuICogQHBhcmFtIGlucHV0IFRoZSBvcmlnaW5hbCBiYXRjaGVkIHJlcXVlc3RcbiAqIEBwYXJhbSBkYXRhRmllbGRzIFRoZSBpbnB1dCByZXF1ZXN0IGRhdGEgb2JqZWN0J3MgZmllbGRzXG4gKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYmF0Y2hpbmcgaXMgY29tcGxldGVcbiAqL1xuZXhwb3J0IGNvbnN0IHNlcGFyYXRlQmF0Y2hlcyA9IGFzeW5jIChcbiAgaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0LFxuICBjYWxsYmFjazogKHNpbmdsZUlucHV0OiBBZGFwdGVyUmVxdWVzdCkgPT4gUHJvbWlzZTx2b2lkPixcbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBhd2FpdCBzZXBhcmF0ZUJhdGNoZXNIZWxwZXIoaW5wdXQsIGlucHV0LCBPYmplY3Qua2V5cyhpbnB1dC5kYXRhKSwgY2FsbGJhY2spXG59XG5cbmNvbnN0IHNlcGFyYXRlQmF0Y2hlc0hlbHBlciA9IGFzeW5jIChcbiAgY3VycjogQWRhcHRlclJlcXVlc3QsXG4gIGlucHV0OiBBZGFwdGVyUmVxdWVzdCxcbiAgZGF0YUZpZWxkczogc3RyaW5nW10sXG4gIGNhbGxiYWNrOiAoc2luZ2xlSW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KSA9PiBQcm9taXNlPHZvaWQ+LFxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChkYXRhRmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGF3YWl0IGNhbGxiYWNrKGN1cnIpXG4gIH0gZWxzZSB7XG4gICAgbGV0IGRhdGFWYWx1ZXMgPSBpbnB1dC5kYXRhW2RhdGFGaWVsZHNbMF1dXG4gICAgaWYgKGRhdGFWYWx1ZXMgIT0gbnVsbCAmJiBkYXRhVmFsdWVzICE9IHVuZGVmaW5lZCkge1xuICAgICAgZGF0YVZhbHVlcyA9IEFycmF5LmlzQXJyYXkoZGF0YVZhbHVlcykgPyBkYXRhVmFsdWVzIDogW2RhdGFWYWx1ZXNdXG4gICAgICBmb3IgKGNvbnN0IHZhbCBvZiBkYXRhVmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDdXJyID0ge1xuICAgICAgICAgIC4uLmN1cnIsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgLi4uY3Vyci5kYXRhLFxuICAgICAgICAgICAgW2RhdGFGaWVsZHNbMF1dOiB2YWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBzZXBhcmF0ZUJhdGNoZXNIZWxwZXIodXBkYXRlZEN1cnIsIGlucHV0LCBkYXRhRmllbGRzLnNsaWNlKDEpLCBjYWxsYmFjaylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==