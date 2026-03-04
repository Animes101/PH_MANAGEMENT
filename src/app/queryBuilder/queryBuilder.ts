class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
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

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.modelQuery = this.modelQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    const sort = this.query.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

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
      const fields = (this.query.fields as string)
        .split(',')
        .join(' ');
      this.modelQuery = this.modelQuery.select(fields);
    } else {
      this.modelQuery = this.modelQuery.select('-__v');
    }

    return this;
  }
}


export default QueryBuilder;


// import { Query } from "mongoose";

// class QueryBuilder<T> {
//   public modelQuery: Query<T[], T>;
//   public query: Record<string, unknown>;

//   constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
//     this.modelQuery = modelQuery;
//     this.query = query;
//   }

//   // 🔍 SEARCH
//   search(searchableFields: string[]) {
//     if (this.query?.searchTerm) {
//       const searchTerm = this.query.searchTerm as string;

//       this.modelQuery = this.modelQuery.find({
//         $or: searchableFields.map((field) => ({
//           [field]: { $regex: searchTerm, $options: "i" },
//         })),
//       });
//     }

//     return this;
//   }

//   // 🎯 FILTER
//   filter() {
//     const queryObject = { ...this.query };

//     const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
//     excludeFields.forEach((el) => delete queryObject[el]);

//     this.modelQuery = this.modelQuery.find(queryObject);

//     return this;
//   }

//   // 🔃 SORT
//   sort() {
//     if (this.query?.sort) {
//       const sortBy = (this.query.sort as string).split(",").join(" ");
//       this.modelQuery = this.modelQuery.sort(sortBy);
//     } else {
//       this.modelQuery = this.modelQuery.sort("-createdAt"); 
//     }

//     return this;
//   }

//   // 📄 PAGINATION
//   paginate() {
//     const page = Number(this.query.page) || 1;
//     const limit = Number(this.query.limit) || 10;

//     const skip = (page - 1) * limit;

//     this.modelQuery = this.modelQuery.skip(skip).limit(limit);

//     return this;
//   }

//   // 🎛 FIELD LIMITING
//   fields() {
//     if (this.query?.fields) {
//       const fields = (this.query.fields as string).split(",").join(" ");
//       this.modelQuery = this.modelQuery.select(fields);
//     } else {
//       this.modelQuery = this.modelQuery.select("-__v");
//     }

//     return this;
//   }

//   // 🚀 EXECUTE
//   async exec() {
//     return await this.modelQuery;
//   }
// }

// export default QueryBuilder;