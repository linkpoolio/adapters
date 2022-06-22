"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDebug = void 0;
const util_1 = require("../../util");
const withDebug = async (execute, context) => async (input) => {
    const result = await execute(input, context);
    if (!util_1.isDebug()) {
        const { debug, ...rest } = result;
        return rest;
    }
    return result;
};
exports.withDebug = withDebug;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvZGVidWdnZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQW9DO0FBRTdCLE1BQU0sU0FBUyxHQUFlLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDL0UsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzVDLElBQUksQ0FBQyxjQUFPLEVBQUUsRUFBRTtRQUNkLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDakMsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBUFksUUFBQSxTQUFTLGFBT3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWlkZGxld2FyZSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBpc0RlYnVnIH0gZnJvbSAnLi4vLi4vdXRpbCdcblxuZXhwb3J0IGNvbnN0IHdpdGhEZWJ1ZzogTWlkZGxld2FyZSA9IGFzeW5jIChleGVjdXRlLCBjb250ZXh0KSA9PiBhc3luYyAoaW5wdXQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZShpbnB1dCwgY29udGV4dClcbiAgaWYgKCFpc0RlYnVnKCkpIHtcbiAgICBjb25zdCB7IGRlYnVnLCAuLi5yZXN0IH0gPSByZXN1bHRcbiAgICByZXR1cm4gcmVzdFxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cbiJdfQ==