export function mask(data: any, maskFields: string[]) {
    if (!maskFields || maskFields.length === 0) return data;

    const maskedData = { ...data };
    maskFields.forEach((field) => {
        if (maskedData?.body[field]) {
            maskedData.body[field] = '****'; // Mask the sensitive field
        }
        if (maskedData?.query[field]) {
            maskedData.query[field] = '****';
        }
        if (maskedData?.headers[field]) {
            maskedData.headers[field] = '****';
        }
    });

    return maskedData;
}
