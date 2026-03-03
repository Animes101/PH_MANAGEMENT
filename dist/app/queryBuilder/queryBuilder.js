"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        if (this.query?.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: this.query?.searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObject = { ...this.query };
        // 🧹 Filtering
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObject[el]);
        this.modelQuery = this.modelQuery.find(queryObject);
        return this;
    }
}
