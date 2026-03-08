"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        if (typeof this.query.searchTerm === 'string') {
            const searchTerm = this.query.searchTerm;
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObject = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObject[el]);
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
        this.modelQuery = this.modelQuery.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        const sort = this.query.sort || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    pagination() {
        const page = Number(this.query.page || 1);
        const limit = Number(this.query.limit || 10);
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        if (this.query.fields) {
            const fields = this.query.fields
                .split(',')
                .join(' ');
            this.modelQuery = this.modelQuery.select(fields);
        }
        else {
            this.modelQuery = this.modelQuery.select('-__v');
        }
        return this;
    }
}
exports.default = QueryBuilder;
