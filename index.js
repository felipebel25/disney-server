var $hXvsm$mongoose = require("mongoose");
var $hXvsm$dotenv = require("dotenv");
var $hXvsm$express = require("express");
var $hXvsm$morgan = require("morgan");
var $hXvsm$expressratelimit = require("express-rate-limit");
var $hXvsm$helmet = require("helmet");
var $hXvsm$expressmongosanitize = require("express-mongo-sanitize");
var $hXvsm$xssclean = require("xss-clean");
var $hXvsm$hpp = require("hpp");
var $hXvsm$cors = require("cors");



// Unhandled Rejections is for example for something that doesn't exist in the code.
process.on('uncaughtException', (err)=>{
    console.log('UNCAUGHT EXCEPTION! Shutting down');
    console.log({
        name: err.name,
        message: err.message,
        err: err
    });
    process.exit(1);
});
var $84a264530b3fb4fb$exports = {};








const $84a264530b3fb4fb$var$app = $hXvsm$express();
var $851e07367d4fc3f3$exports = {};

var $76e7961079678561$export$bef7f5b87ecd4e05;
var $76e7961079678561$export$a491843cc088839f;
var $76e7961079678561$export$7faf2f866a2eede1;
var $76e7961079678561$export$4c90d4b7382dad57;
var $76e7961079678561$export$1b246d2f2efdafde;
var $76e7961079678561$export$95c4b71b6433cd9b;
// e.g /v1/tours/distances/34.074052985283764,-118.40064801489154/unit/mi
var $76e7961079678561$export$c76b58cfe053f228;
var $c2ce844c02918c0b$exports = {};

// const validator = require('validator');
const $c2ce844c02918c0b$var$tourSchema = new $hXvsm$mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            'A tour must have a name'
        ],
        unique: true,
        trim: true,
        maxLength: [
            255,
            'A tour name must have less or equal than 55 characters'
        ],
        minLength: [
            2,
            'A tour name must have less than 2 characters'
        ]
    },
    resort: {
        type: String,
        required: [
            true,
            'A tour must have a resort'
        ],
        trim: true,
        maxLength: [
            255,
            'A tour resort must have less or equal than 55 characters'
        ],
        minLength: [
            2,
            'A tour resort must have less than 2 characters'
        ]
    },
    city: {
        type: String,
        required: [
            true,
            'A tour must have a city'
        ],
        trim: true,
        maxLength: [
            255,
            'A tour city must have less or equal than 55 characters'
        ],
        minLength: [
            2,
            'A tour city must have less than 2 characters'
        ]
    },
    country: {
        type: String,
        required: [
            true,
            'A tour must have a country'
        ],
        trim: true,
        maxLength: [
            255,
            'A tour country must have less or equal than 55 characters'
        ],
        minLength: [
            2,
            'A tour country must have less than 2 characters'
        ]
    },
    location: {
        // GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: [
                'Point'
            ]
        },
        coordinates: [
            Number
        ]
    },
    url: {
        type: String,
        require: [
            true,
            'Tour must have an url'
        ]
    },
    images: {
        type: [
            String
        ],
        required: [
            true,
            'Assign at least an image to the tour'
        ]
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
// 2dsphere indexes support geospatial queries on an earth-like sphere.
$c2ce844c02918c0b$var$tourSchema.index({
    location: '2dsphere'
});
// GUIDES Embbeding approach
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });
// post save
// tourSchema.post('save', function (next) {
//   next();
// })
// pre ---> save ---> post
//  https://mongoosejs.com/docs/middleware.html
// QUERY MIDDLEWARE
// AGGREGATION MIDDLEWARE
// aggregation is the event when you use aggregation filters
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({
//     $match: { secretTour: { $ne: true } },
//   });
//   next();
// });
const $c2ce844c02918c0b$var$Tour = $hXvsm$mongoose.model('Tour', $c2ce844c02918c0b$var$tourSchema);
// const testTour = new Tour({
//   name: 'Test Tour',
//   rating: 4.7,
//   price: 299,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR', err);
//   });
$c2ce844c02918c0b$exports = $c2ce844c02918c0b$var$Tour;


var $e203200498571e93$exports = {};
class $e203200498571e93$var$AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
$e203200498571e93$exports = $e203200498571e93$var$AppError;


var $9e7a345a81ca5826$exports = {};
$9e7a345a81ca5826$exports = (fn)=>(req, res, next)=>{
        fn(req, res, next).catch(next);
    };


var $e041bef5c19fcd3c$export$36a479340da3c347;
var $e041bef5c19fcd3c$export$3220ead45e537228;
var $e041bef5c19fcd3c$export$5d49599920443c31;
var $e041bef5c19fcd3c$export$2eb5ba9a66e42816;
var $e041bef5c19fcd3c$export$2774c37398bee8b2;


var $35c12386c6082d4c$exports = {};
class $35c12386c6082d4c$var$APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        // Build query
        const queryObj = {
            ...this.queryString
        };
        const excludedFields = [
            'page',
            'sort',
            'limit',
            'fields'
        ];
        excludedFields.forEach((field)=>delete queryObj[field]);
        // 2) advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`);
        // gte, gt , lte, lt
        // const query = Tour.find(JSON.parse(queryStr));
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else this.query = this.query.sort('-createdAt');
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else this.query = this.query.select('-__v');
        return this;
    }
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
$35c12386c6082d4c$exports = $35c12386c6082d4c$var$APIFeatures;


$e041bef5c19fcd3c$export$36a479340da3c347 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return next(new $e203200498571e93$exports('No document founded with that Id', 404));
        res.status(204).json({
            status: 'success',
            requestedAt: req.requestTime
        });
    });
$e041bef5c19fcd3c$export$3220ead45e537228 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) return next(new $e203200498571e93$exports('No document founded with that Id', 404));
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            },
            requestedAt: req.requestTime
        });
    });
$e041bef5c19fcd3c$export$5d49599920443c31 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        const doc = await Model.create(req.body);
        if (!doc) return next(new $e203200498571e93$exports('No document founded with that Id', 404));
        res.status(201).json({
            status: 'success',
            data: doc
        });
    });
$e041bef5c19fcd3c$export$2eb5ba9a66e42816 = (Model, popOptions)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        let query = Model.findById(req.params.id);
        // add pop options if needed
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;
        if (!doc) return next(new $e203200498571e93$exports('No document found with that Id', 404));
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });
$e041bef5c19fcd3c$export$2774c37398bee8b2 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        // Allowed nested routes GET reviews on tour (hack)
        let filter = {};
        if (req.params.tourId) filter = {
            tour: req.params.tourId
        };
        //Execute the query
        const features = new $35c12386c6082d4c$exports(Model.find(filter), req.query).filter().sorting().limitFields().paginate();
        // explain
        // const doc = await features.query.explain();
        const doc = await features.query;
        if (!doc) return next(new $e203200498571e93$exports('No documents found', 404));
        res.status(200).json({
            status: 'success',
            data: {
                doc: doc
            },
            length: doc.length,
            requestedAt: req.requestTime
        });
    });


var $76e7961079678561$require$deleteOne = $e041bef5c19fcd3c$export$36a479340da3c347;
var $76e7961079678561$require$updateOne = $e041bef5c19fcd3c$export$3220ead45e537228;
var $76e7961079678561$require$createOne = $e041bef5c19fcd3c$export$5d49599920443c31;
var $76e7961079678561$require$getOne = $e041bef5c19fcd3c$export$2eb5ba9a66e42816;
var $76e7961079678561$require$getAll = $e041bef5c19fcd3c$export$2774c37398bee8b2;
$76e7961079678561$export$bef7f5b87ecd4e05 = (req, res, next)=>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
$76e7961079678561$export$a491843cc088839f = $76e7961079678561$require$createOne($c2ce844c02918c0b$exports);
$76e7961079678561$export$7faf2f866a2eede1 = $76e7961079678561$require$updateOne($c2ce844c02918c0b$exports);
$76e7961079678561$export$4c90d4b7382dad57 = $76e7961079678561$require$deleteOne($c2ce844c02918c0b$exports);
$76e7961079678561$export$1b246d2f2efdafde = $76e7961079678561$require$getAll($c2ce844c02918c0b$exports);
$76e7961079678561$export$95c4b71b6433cd9b = $76e7961079678561$require$getOne($c2ce844c02918c0b$exports, {
    path: 'reviews'
});
$76e7961079678561$export$c76b58cfe053f228 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const { latLng: latLng, unit: unit } = req.params;
    // good approach to destructure an array
    const [lat, lng] = latLng.split(',');
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
    if (!lat || !lng) next(new $e203200498571e93$exports(400, 'Please provide a latitude and longitude in the format lat,lng.'));
    const distances = await $c2ce844c02918c0b$exports.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [
                        lng * 1,
                        lat * 1
                    ]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1,
                resort: 1,
                city: 1,
                country: 1,
                'location.coordinates': 1,
                images: 1,
                url: 1
            }
        }
    ]);
    res.status(200).json({
        status: 'success',
        data: {
            data: distances
        }
    });
});


var $851e07367d4fc3f3$require$getAllTours = $76e7961079678561$export$1b246d2f2efdafde;
var $851e07367d4fc3f3$require$createTour = $76e7961079678561$export$a491843cc088839f;
var $851e07367d4fc3f3$require$getDistances = $76e7961079678561$export$c76b58cfe053f228;
// const { createReview } = require('../controllers/reviewController');
const $851e07367d4fc3f3$var$router = $hXvsm$express.Router();
$851e07367d4fc3f3$var$router.route('/').get($851e07367d4fc3f3$require$getAllTours).post($851e07367d4fc3f3$require$createTour);
$851e07367d4fc3f3$var$router.route('/distances/:latLng/unit/:unit').get($851e07367d4fc3f3$require$getDistances);
$851e07367d4fc3f3$exports = $851e07367d4fc3f3$var$router;



var $6e01d007996f5575$exports = {};

const $6e01d007996f5575$var$handleCastErrorDB = (err, next)=>{
    const message = `Invalid ${err.path} : ${err.value}.`;
    return new $e203200498571e93$exports(message, 400);
};
const $6e01d007996f5575$var$handleDuplicateFieldsDB = (err)=>{
    const value = Object.values(err.keyValue)[0];
    const message = `Duplicate field value: ${value}. Use another value.`;
    return new $e203200498571e93$exports(message, 400);
};
const $6e01d007996f5575$var$handleValidationErrorDB = (err)=>{
    const errors = Object.values(err.errors).map((el)=>el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new $e203200498571e93$exports(message, 400);
};
const $6e01d007996f5575$var$handleJWTErrorDB = ()=>new $e203200498571e93$exports('Invalid Token. Please provide a valid token', 401);
$6e01d007996f5575$exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    let error = Object.create(err) || err;
    if (error.name === 'CastError') error = $6e01d007996f5575$var$handleCastErrorDB(error);
    if (error.code === 11000) error = $6e01d007996f5575$var$handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = $6e01d007996f5575$var$handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = $6e01d007996f5575$var$handleJWTErrorDB();
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        err: process.env.NODE_ENV !== 'production' ? error : null,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : null
    });
};


// 1 GLOBAL Middlewares
// Security HTTP headers
$84a264530b3fb4fb$var$app.use($hXvsm$helmet());
// Development loggin
if (process.env.NODE_ENV !== 'production') $84a264530b3fb4fb$var$app.use($hXvsm$morgan('dev'));
// Limit requests from same API
const $84a264530b3fb4fb$var$limiter = $hXvsm$expressratelimit({
    max: 100,
    windowMs: 3600000,
    message: 'Too many requests from this IP, please try again in an hour.'
});
$84a264530b3fb4fb$var$app.use('/api', $84a264530b3fb4fb$var$limiter);
// Body parser, reading data from body into req.body object
$84a264530b3fb4fb$var$app.use($hXvsm$express.json({
    limit: '10kb'
}));
// data sanitization against no SQL query injection
$84a264530b3fb4fb$var$app.use($hXvsm$expressmongosanitize());
// Data sanitization against XSS
$84a264530b3fb4fb$var$app.use($hXvsm$xssclean());
// Prevent parameter pollution
$84a264530b3fb4fb$var$app.use($hXvsm$hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));
// Test middleware
$84a264530b3fb4fb$var$app.use((req, res, next)=>{
    req.requestTime = Date.now().toString();
    next();
});
const $84a264530b3fb4fb$var$options = {
    origin: 'http://localhost:4321'
};
$84a264530b3fb4fb$var$app.use($hXvsm$cors($84a264530b3fb4fb$var$options));
// 2 routes
$84a264530b3fb4fb$var$app.use('/api/v1/disney', $851e07367d4fc3f3$exports);
// Error handling middleware 404
$84a264530b3fb4fb$var$app.all('*', (req, res, next)=>{
    next(new $e203200498571e93$exports(`Can't find ${req.originalUrl} on this server`, 404));
});
$84a264530b3fb4fb$var$app.use($6e01d007996f5575$exports);
$84a264530b3fb4fb$exports = $84a264530b3fb4fb$var$app;


$hXvsm$dotenv.config({
    path: './config.env'
});
const $2685e5b20c9f29f6$var$DB = process.env.DATABASE.replace('<PASSWORD>', `${process.env.DATABASE_PASSWORD}`);
$hXvsm$mongoose.connect($2685e5b20c9f29f6$var$DB).then(()=>{
    console.log('DB connection successfull!');
});
// 4 Start server
const $2685e5b20c9f29f6$var$port = process.env.PORT || 3000;
const $2685e5b20c9f29f6$var$server = $84a264530b3fb4fb$exports.listen($2685e5b20c9f29f6$var$port, ()=>{
    console.log(`listening on port ${$2685e5b20c9f29f6$var$port}`);
});
// Unhandled Rejections is for example for password mongodb incorrectly.
process.on('unhandledRejection', (err)=>{
    console.log('UNHANDLED REJECTION! Shutting down');
    console.log({
        name: err.name,
        message: err.message,
        err: err
    });
    $2685e5b20c9f29f6$var$server.close();
    process.exit(1);
});


//# sourceMappingURL=index.js.map
